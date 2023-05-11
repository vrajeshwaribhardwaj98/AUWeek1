const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-10);
console.log('address:', toHex(address));