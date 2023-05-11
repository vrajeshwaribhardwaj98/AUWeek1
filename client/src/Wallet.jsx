import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

function getAddress(publicKey){
  return keccak256(publicKey.slice(1)).slice(-10);
};

function hashMessage(message){
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
    return hash;
};

function signMsg(msg){
  const message = hashMessage('Approving Transaction');
  let response = secp.sign(message, privateKey, {recovered: true});
  return sign;
};

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, publicKey, setPublicKey, signature, setSignature, recoveryBit, setRecoveryBit }) {
  async function onChange(evt) {
    const privateKey = evt.target.value; //Set Private Key
    setPrivateKey(privateKey);

    const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey)); //Get Public Key from Private Key
    setPublicKey(publicKey);
    console.log('public key:', publicKey);

    const address = getAddress(publicKey); //Get Address from Private Key
    setAddress(address);

    const response = await signMsg(privateKey);
    const [signature, recoveryBit] = response;
    setSignature(signature);
    setRecoveryBit(recoveryBit);
    console.log('signature:', signature);
    console.log('recovery bit:', recoveryBit);



    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0, 10)}...
      </div>

      <div>
        Public Key: {publicKey}...
      </div>

      <div>
        Signature: {signature}
      </div>

      <div>
        Recovery Bit: {recoveryBit}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
