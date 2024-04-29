import { Authorized, Keypair, LAMPORTS_PER_SOL, Lockup, PublicKey, StakeProgram, SystemProgram, Transaction, sendAndConfirmTransaction } from "@velas/web3";
import { decode } from "bs58";
import { getKeyPairFromSecretKey } from "./keyPair";
import { getConnection } from "./connection";

export const delegate = async () => {
    const pk = "31efhNrUAxzJy3GP6RESzzeztAToRo8FEWXiTZxXSXnats9CXBLZytfdg1bGZLkD86zhXX32ehiYJuX4zEXKsNi";
    const keypair = getKeyPairFromSecretKey(pk);
    const connection = getConnection();
    const { blockhash } = await connection.getRecentBlockhash();

    const createAndInitialize = StakeProgram.createAccount({
        fromPubkey: keypair.publicKey,
        authorized: new Authorized(keypair.publicKey),
        lockup: new Lockup(0, 0, new PublicKey(0)),
        lamports: 2000000,
    });

    const transaction = new Transaction().add(createAndInitialize);
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = keypair.publicKey;
    transaction.sign(keypair,keypair);
    await connection.sendTransaction(transaction, [keypair,keypair]);

    const delegation = StakeProgram.delegate({
        stakePubkey: keypair.publicKey,
        authorizedPubkey: keypair.publicKey,
        votePubkey: new PublicKey("Bbg2muexVXbVKjZueXS9dWpx2jMG47jUKajL5ok5PqN9")
    });
    const delegationTx = new Transaction().add(delegation);
    delegationTx.recentBlockhash = blockhash;
    delegationTx.feePayer = keypair.publicKey;
    delegationTx.sign(keypair,keypair);

    await connection.sendTransaction(delegationTx, [keypair,keypair]);
};
