import { Keypair } from "@velas/web3";
import { getKeyPairFromSecretKey } from "../keyPair";
import { NEXIS_LOGGED_IN_MNEMONIC, NEXIS_STAKED_ACCOUNTS } from "../lsIdents"

export const getStoredWallet = async()=>{
    const storedAccount = await localStorage.getItem(NEXIS_LOGGED_IN_MNEMONIC);
    const parsedStoredAccount = JSON.parse(storedAccount);
    const keypair = getKeyPairFromSecretKey(parsedStoredAccount.secretKey);
    return keypair;
}

export const getLastStakedAccount = async()=>{
    const storedAccounts = await localStorage.getItem(NEXIS_STAKED_ACCOUNTS);
    const parsedStoredAccount = JSON.parse(storedAccounts);
    const uint8Array = new Uint8Array(Object.values(parsedStoredAccount.accounts[parsedStoredAccount.accounts.length-1]._keypair.secretKey));
    const keypair = Keypair.fromSecretKey(uint8Array);
    return keypair;
}