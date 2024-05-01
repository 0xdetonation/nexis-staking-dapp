import { PublicKey, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getStoredWallet } from "../account/getStoredAccount";
import { getConnection } from "../connection";

export const stake = async(votePubkey,stakeAccount,showToast)=>{
  try {
    const wallet = await getStoredWallet();
    const stakeAccountPublicKey = new PublicKey(stakeAccount);
    const delegateTx = StakeProgram.delegate({
        stakePubkey: stakeAccountPublicKey,
        authorizedPubkey: wallet.publicKey,
        votePubkey: new PublicKey(votePubkey),
    });
  
  const delegateTxId = await sendAndConfirmTransaction(getConnection(), delegateTx, [
    wallet,
  ]);
  console.log(
    `Stake account delegated to ${selectedValidatorPubkey}. Tx Id: ${delegateTxId}`
  );
  
  // Check in on our stake account. It should now be activating.
  stakeStatus = await getConnection().getStakeActivation(stakeAccountPublicKey);
  console.log(`Stake account status: ${stakeStatus.state}`);
    
  } catch (error) {
    console.log("error")
    console.log(error)
    if(error.toString().includes("Transaction was not confirmed in 30.00 seconds")){
        showToast("Stake Successfully!");
        setTimeout(function() {
            window.location.reload();
          }, 5000);
    }else{
        showToast("Error creating a stake account");
    }
  }
  
}