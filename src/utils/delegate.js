import { Authorized, Keypair, LAMPORTS_PER_SOL, Lockup, PublicKey, StakeProgram, SystemProgram, Transaction, sendAndConfirmTransaction } from "@velas/web3";
import { decode } from "bs58";
import { getKeyPairFromSecretKey } from "./keyPair";
import { getConnection } from "./connection";

let sk=undefined;
//amount to stake and public address of validator
export const delegate = async (amount,voteAddress) => {
    const connection = getConnection();

    const storedAccount = await localStorage.getItem(NEXIS_LOGGED_IN_MNEMONIC);

    // will fetch this from local storage ok
    const walletKeyPair= getKeyPairFromSecretKey((JSON.parse(storedAccount)).secretKey)

    let stakeAccount = Keypair.generate(); //generating a stake account
    if(sk==undefined){
        sk = (stakeAccount.secretKey)
        
        // create stake account
        let createStakeAccountInstruction = StakeProgram.createAccount({
        fromPubkey: walletKeyPair.publicKey,
        stakePubkey: stakeAccount.publicKey,
        authorized: new Authorized(walletKeyPair.publicKey, walletKeyPair.publicKey),
        lamports: LAMPORTS_PER_SOL * amount,
        });
    
        let createStakeAccountTransaction = new Transaction().add(createStakeAccountInstruction);
        createStakeAccountTransaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    
        createStakeAccountTransaction.feePayer = walletKeyPair.publicKey;
        createStakeAccountTransaction.partialSign(stakeAccount);
        try {
            createStakeAccountTransaction = await sendAndConfirmTransaction(
                connection,
                createStakeAccountTransaction,
                [walletKeyPair, stakeAccount],
            );
        } catch (error) {
            console.log(error)
        }
    }else{
            stakeAccount = Keypair.fromSecretKey(sk);
        
            const votePubkey = new PublicKey(voteAddress)
            let delegateInstruction = StakeProgram.delegate({
            stakePubkey: stakeAccount.publicKey,
            authorizedPubkey: walletKeyPair.publicKey,
            votePubkey,
            });
        
            let delegateTransaction = new Transaction().add(delegateInstruction);
            delegateTransaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
            delegateTransaction.feePayer = walletKeyPair.publicKey;
            delegateTransaction.sign(walletKeyPair);
    
            delegateTransaction = await sendAndConfirmTransaction(
            connection,
            delegateTransaction,
            [walletKeyPair],
            );
    }
};
