const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const toAddress = ""; //to public key
const fromKeyPair = StellarSdk.Keypair.fromSecret(
    "", // from secret key
);

(async () => {

    try {
        const fromAccount = await server.loadAccount(fromKeyPair.publicKey());
        const transaction = new StellarSdk.TransactionBuilder(fromAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(
                StellarSdk.Operation.payment({
                    destination: toAddress,
                    asset: new StellarSdk.Asset('USDC', 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'), // testnet address
                    amount: "2", // amount
                }),
            )
            .addMemo(StellarSdk.Memo.text("Test USDC Send Transaction"))
            .setTimeout(180)
            .build();
        transaction.sign(fromKeyPair);

        const result = await server.submitTransaction(transaction);

        console.log("Transaction ID: " + result.id);
    } catch (e) {
        console.log(e);
    }
    
})();