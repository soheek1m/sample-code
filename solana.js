const {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
} = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount, transfer } = require("@solana/spl-token");

const USDC_DEV_PUBLIC_KEY = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; // USDC TokenAddress in devnet
const SENDER_PRIVATE_KEY_BYTES = [];
const RECEIVER_PUBLIC_KEY = "";

(async () => {

    const connection = new Connection(
        clusterApiUrl("devnet"),
        "confirmed",
    );

    const usdcPublicKey = new PublicKey(USDC_DEV_PUBLIC_KEY);
    const receiverAddressPublicKey = new PublicKey(RECEIVER_PUBLIC_KEY);

    const senderPrivateKey = Uint8Array.from(SENDER_PRIVATE_KEY_BYTES);
    const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderKeypair,
        usdcPublicKey,
        senderKeypair.publicKey,
    );

    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderKeypair,
        usdcPublicKey,
        receiverAddressPublicKey,
    );

    const signature = await transfer(
        connection,
        senderKeypair,
        senderTokenAccount.address,
        receiverTokenAccount.address,
        senderKeypair.publicKey,
        10, // amount
    );

    console.log(`You can verify the transaction on https://explorer.solana.com/tx/${signature}?cluster=devnet`);

})();
