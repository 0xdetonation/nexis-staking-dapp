import { PublicKey, StakeProgram } from "@velas/web3";
import { getConnection } from "../connection"
import { NEXIS_LOGGED_IN_MNEMONIC } from "../lsIdents";
import { getKeyPairFromSecretKey } from "../keyPair";

export const getBalance = async (addr)=>{
    const connection = getConnection();
    const details = await connection.getBalance(new PublicKey(addr));
    if(!details){
        return {
            balance: 0
        }
    }else{
        return {
            balance:details/1e9
        };
    }
}

export const getAccountStakes = async()=>{
    const storedAccount = await localStorage.getItem(NEXIS_LOGGED_IN_MNEMONIC);
    const wallet = getKeyPairFromSecretKey(JSON.parse(storedAccount).secretKey);
    let totalStakeBalance = 0;

    // fetch all stake account for this wallet
    const allStakeAccounts = await getConnection().getParsedProgramAccounts(
      StakeProgram.programId,
      {
        filters: [
          {
            memcmp: {
              offset: 12, // number of bytes
              bytes: wallet.publicKey.toBase58(), // base58 encoded string
            },
          },
        ],
      }
    );
    console.log(`Stake accounts for wallet ${wallet.publicKey}: `);
    console.log(
      `Total number of stake account for ${wallet.publicKey} is: ${allStakeAccounts.length}`
    );
    // calculating total stake amount
    for (const account of allStakeAccounts) {
      totalStakeBalance += account.account.lamports;
    }
    // total stake amount
    console.log(`Stake amount for this wallet in lamports: ${totalStakeBalance}`);

    return {
      totalStakeBalance,
      allStakeAccounts,
      stakes:allStakeAccounts.length
    }
}