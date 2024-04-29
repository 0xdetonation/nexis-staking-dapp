import { Authorized, Keypair, LAMPORTS_PER_SOL, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getStoredWallet } from "../account/getStoredAccount";
import { NEXIS_STAKED_ACCOUNTS } from "../lsIdents";
import { getConnection } from "../connection";

export const createStakeAcc = async(amountToStake)=>{

    const wallet = await getStoredWallet();
    const connection = getConnection();
    
    // fetch all stored staked accounts
    let storedStakedAccountsArr=[];
    try {
        const storedStakedAccounts = await localStorage.getItem(NEXIS_STAKED_ACCOUNTS);
        const parsedStoredStakedAccounts = JSON.parse(storedStakedAccounts);
        if(parsedStoredStakedAccounts){
            storedStakedAccountsArr=parsedStoredStakedAccounts.accounts
        }
    } catch (error) {}

    //created a new stake account and adding it to ls
    const stakeAccount =  Keypair.generate();
    storedStakedAccountsArr.push(stakeAccount)
    localStorage.setItem(NEXIS_STAKED_ACCOUNTS,JSON.stringify({accounts:storedStakedAccountsArr}));

    const createStakeAccountTx = StakeProgram.createAccount({
        authorized: new Authorized(wallet.publicKey, wallet.publicKey),
        fromPubkey: wallet.publicKey,
        lamports:LAMPORTS_PER_SOL* amountToStake,
        stakePubkey: stakeAccount.publicKey,
    });
    
    createStakeAccountTx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    createStakeAccountTx.feePayer = wallet.publicKey;
    createStakeAccountTx.partialSign(stakeAccount);
    const createStakeAccountTxId = await sendAndConfirmTransaction(
        connection,
        createStakeAccountTx,
        [
        wallet,
        stakeAccount
        ]
    );
    console.log(`Stake account created. Tx Id: ${createStakeAccountTxId}`);
    
    // Check our newly created stake account balance. This should be 0.5 SOL.
    let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
    console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} NZT`);
    
    // Verify the status of our stake account. This will start as inactive and will take some time to activate.
    let stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log(`Stake account status: ${stakeStatus.state}`);
    
}