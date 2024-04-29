import { PublicKey } from "@velas/web3";
import { getConnection } from "../connection"

export const getAccountInfo = async (addr)=>{
    const connection = getConnection();
    const details = await connection.getAccountInfo(new PublicKey(addr));
    if(!details){
        return {
            balance: 0
        }
    }else{
        return {
            balance:details.lamports/1e9
        };
    }
}