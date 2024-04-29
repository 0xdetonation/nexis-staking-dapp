import * as bip39 from 'bip39';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export const createAccount = async () => {
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const seedHex = seed.slice(0, 32).toString('hex');

    const keyPair = nacl.sign.keyPair.fromSeed(Buffer.from(seedHex, 'hex'));
    const publicKey = bs58.encode(Buffer.from(keyPair.publicKey));
    const secretKey = bs58.encode(Buffer.from(keyPair.secretKey));

    return {
        mnemonic,
        publicKey,
        secretKey
    };
};
