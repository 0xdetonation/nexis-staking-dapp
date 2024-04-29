import { LAMPORTS_PER_SOL, StakeProgram, sendAndConfirmTransaction } from "@velas/web3";
import { getStoredWallet } from "../account/getStoredAccount";
import { getConnection } from "../connection";

export const withdrawStake = async(stakeAccount)=>{
  const wallet = await getStoredWallet();
  const stakeBalance = await getConnection().getBalance(stakeAccount.publicKey);
const withdrawTx = StakeProgram.withdraw({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
  toPubkey: wallet.publicKey,
  lamports: stakeBalance,
});

const withdrawTxId = await sendAndConfirmTransaction(getConnection(), withdrawTx, [
  wallet,
]);
console.log(`Stake account withdrawn. Tx Id: ${withdrawTxId}`);

// Confirm that our stake account balance is now 0
stakeBalance = await getConnection().getBalance(stakeAccount.publicKey);
console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} NZT`);

}