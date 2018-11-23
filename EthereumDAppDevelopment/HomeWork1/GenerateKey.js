const Wallet = require('/Users/tsaimingjhe/.nvm/versions/node/v11.0.0/lib/node_modules/ethereumjs-wallet');
const keccak256 = require('/Users/tsaimingjhe/.nvm/versions/node/v11.0.0/lib/node_modules/js-sha3').keccak256;

const wallet = Wallet.generate();

const privKey = wallet.getPrivateKeyString();
console.log('privKey', privKey);

const publicKey = wallet.getPublicKeyString();
console.log('pubKey:', publicKey);

const address = wallet.getAddressString();
console.log('address', address);

const keystoreFilename = wallet.getV3Filename();
console.log(keystoreFilename);

const keystore = wallet.toV3("nccu");
console.log(keystore);

const walleta = Wallet.fromV3(keystore, "nccu");
console.log("Private key " + walleta.getPrivateKey().toString("hex"));