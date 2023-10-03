const StellarSdk = require("stellar-sdk");

const STELLAR_TEST_SERVER_URL = "https://horizon-testnet.stellar.org";
const USDC_TEST_PUBLIC_KEY = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";
// Both sender and reciever have to opt in to hold USDC token by adding trustline
// More info on https://developers.stellar.org/docs/glossary#trustline
const SENDER_PRIVATE_KEY = "";
const RECEIVER_PUBLIC_KEY = "";

(async () => {

    try {
        const server = new StellarSdk.Server(STELLAR_TEST_SERVER_URL);
        const senderKeyPair = StellarSdk.Keypair.fromSecret(SENDER_PRIVATE_KEY);
        const senderAccount = await server.loadAccount(senderKeyPair.publicKey());
        const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(
                StellarSdk.Operation.payment({
                    destination: RECEIVER_PUBLIC_KEY,
                    asset: new StellarSdk.Asset("USDC", USDC_TEST_PUBLIC_KEY),
                    amount: "2",
                }),
            )
            .addMemo(StellarSdk.Memo.text("Test USDC Send Transaction"))
            .setTimeout(180)
            .build();
        transaction.sign(senderKeyPair);

        const result = await server.submitTransaction(transaction);
        console.log(`You can verify the transaction on https://testnet.lumenscan.io/txns/${result.id}`);
    } catch (e) {
        console.log(e);
    }
    
})();
