import { PublicKey, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getStoredWallet } from "../account/getStoredAccount";
import { getConnection } from "../connection";

export const stake = async(votePubkey,stakeAccount)=>{
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
  
}