import { Connection, PublicKey } from "@velas/web3";
import { rpc } from "../rpc";

//fetches staking accounts for a validator using vote public key
export const getStakingAccounts = async(voteAcc)=>{
  const STAKE_PROGRAM_ID = new PublicKey(
    "Stake11111111111111111111111111111111111111"
  );
  const VOTE_PUB_KEY = voteAcc;
  
  const connection = new Connection(rpc, "confirmed");
  const accounts = await connection.getParsedProgramAccounts(STAKE_PROGRAM_ID, {
    filters: [
      {
        dataSize: 200, // number of bytes
      },
      {
        memcmp: {
          offset: 124, // number of bytes
          bytes: VOTE_PUB_KEY, // base58 encoded string
        },
      },
    ],
  });
  return (accounts);
}