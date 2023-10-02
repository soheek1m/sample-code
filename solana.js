const {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
} = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, transfer } = require("@solana/spl-token");
const bs58 = require("bs58");

const SOLANA_USDC_DEV_PUBKEY = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; // USDC TokenAddress in devnet
const FROM_SECRET_KEY_BYTES = [];
const TO_ADDRESS = "";

(async () => {

    const connection = new Connection(
        clusterApiUrl('devnet'),
        'confirmed'
    );

    const usdcPublicKey = new PublicKey(SOLANA_USDC_DEV_PUBKEY);
    const toAddressPublicKey = new PublicKey(TO_ADDRESS);
    const fromSecretKey = Uint8Array.from(FROM_SECRET_KEY_BYTES);
    const fromKeypair = Keypair.fromSecretKey(fromSecretKey);


    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromKeypair,
        usdcPublicKey,
        fromKeypair.publicKey
    );

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromKeypair,
        usdcPublicKey,
        toAddressPublicKey
    );

    signature = await transfer(
        connection,
        fromKeypair,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromKeypair.publicKey,
        10 // amount
    );

    console.log('SIGNATURE:', signature);

})();