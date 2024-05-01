import { PublicKey, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getConnection } from "../connection";
import { getStoredWallet } from "../account/getStoredAccount";

export const deactivate = async(stakeAccount)=>{
const wallet = await getStoredWallet();
try {
  const deactivateTx = StakeProgram.deactivate({
      stakePubkey: new PublicKey(stakeAccount),
      authorizedPubkey:  wallet.publicKey,
    });
    const deactivateTxId = await sendAndConfirmTransaction(
      getConnection(),
      deactivateTx,
      [wallet]
    );
    console.log(`Stake account deactivated. Tx Id: ${deactivateTxId}`);
    
    // Check in on our stake account. It should now be inactive.
    stakeStatus = await getConnection().getStakeActivation(new PublicKey(stakeAccount));
    console.log(`Stake account status: ${stakeStatus.state}`);
} catch (error) {
  console.log(error);
}
}