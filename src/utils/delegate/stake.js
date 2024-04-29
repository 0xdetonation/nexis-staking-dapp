import { PublicKey, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getLastStakedAccount, getStoredWallet } from "../account/getStoredAccount";
import { getConnection } from "../connection";

export const stake = async(votePubkey)=>{
    const wallet = await getStoredWallet();
    const stakeAccount = await getLastStakedAccount();

    const delegateTx = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
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
  stakeStatus = await getConnection().getStakeActivation(stakeAccount.publicKey);
  console.log(`Stake account status: ${stakeStatus.state}`);
  
}