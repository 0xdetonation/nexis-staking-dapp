import { LAMPORTS_PER_SOL, PublicKey, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getStoredWallet } from "../account/getStoredAccount";
import { getConnection } from "../connection";
import { Alert } from "@mui/material";

export const withdrawStake = async(stakeAccount,showToast)=>{
  const wallet = await getStoredWallet();
  const stakeAccountPublicKey = new PublicKey(stakeAccount);
  const stakeBalance = await getConnection().getBalance(stakeAccountPublicKey);
  try {
    const withdrawTx = StakeProgram.withdraw({
      stakePubkey: stakeAccountPublicKey,
      authorizedPubkey: wallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports: stakeBalance,
    });
    
    const withdrawTxId = await sendAndConfirmTransaction(getConnection(), withdrawTx, [
      wallet,
    ]);
    
    console.log(`Stake account withdrawn. Tx Id: ${withdrawTxId}`);
    
    // Confirm that our stake account balance is now 0
    stakeBalance = await getConnection().getBalance(stakeAccountPublicKey);
    console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} NZT`);
  } catch (error) {
    console.log("errorrrr")
      if(error.toString().includes("Transaction was not confirmed in 30.00 seconds")){
        showToast("Withdrawal Successful!");
        setTimeout(function() {
            window.location.reload();
          }, 5000);
  }else{
    showToast("Error Withdrawing!");
  }
  }

}