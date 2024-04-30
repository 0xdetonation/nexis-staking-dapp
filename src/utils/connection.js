import * as web3 from "@velas/web3";
import { rpc, wsUrl } from "./rpc";

export const getConnection = ()=>{
    var connection = new web3.Connection(
      rpc,{
        commitment:'singleGossip',
        wsEndpoint:wsUrl
      }
    );
    
    return connection;
}