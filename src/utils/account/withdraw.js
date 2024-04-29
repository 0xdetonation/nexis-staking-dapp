import { PublicKey, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { NEXIS_LOGGED_IN_MNEMONIC } from "../lsIdents";
import { getKeyPairFromSecretKey } from "../keyPair";
import { getConnection } from "../connection";

export const deactivate = async(stakeAccount)=>{
    const storedAccount = await localStorage.getItem(NEXIS_LOGGED_IN_MNEMONIC);
    const wallet = getKeyPairFromSecretKey(JSON.parse(storedAccount).secretKey);
    // At anytime we can choose to deactivate our stake. Our stake account must be inactive before we can withdraw funds.
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
}