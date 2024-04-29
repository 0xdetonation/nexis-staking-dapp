import { Keypair } from "@velas/web3";
import { decode } from "bs58";

export const getKeyPairFromSecretKey = (secretKey)=>{
    return Keypair.fromSecretKey(new Uint8Array(decode(secretKey)));
}