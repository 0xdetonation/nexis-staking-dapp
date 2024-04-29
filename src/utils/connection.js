import * as web3 from "@velas/web3";

export const getConnection = ()=>{
    var connection = new web3.Connection(
      'https://evm-testnet.nexis.network','singleGossip'
    );
    
    return connection;
}