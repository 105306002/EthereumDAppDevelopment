#### (20%) 1. Please compare hash function and cryptographic hash function and give an example.

1. Deterministic : the same message always results in the same hash;
2. Quick : it is quick to compute the hash value for any given message;
3. One-way function : it is infeasible to generate a message from its hash value except by trying all possible messages;
4. Avalanche effect : a small change to a message should change the hash value so extensively that the new hash value appears uncorrelated with the old hash value;
5. Collision resistant : it is infeasible to find two different messages with the same hash value
6. Pre-image attack resistant : a pre-image attack on cryptographic hash functions tries to find a message that has a specific hash value. A cryptographic hash function should resist attacks on its pre-image.

#### (30%) a. Can you print the private/public key with hex string representation? Please give us an example.

```

pubKey:
201be942a809a75fb1c95cc0828b2a1028ff7b9eb135263dc866fb016e6221c8c2e3998bbeae0fa323c261659c209b07668189109c23e43ec5bcaba1f7e9652d

privKey:
381d4652183d7cb0198111901052e573afe470eb7c4c29758967c3901c472336

account:
0x58ff6f058dc03acc447372d57b3e5721cdb0c0ac
```

#### (20%) b. In addition, if we don’t want to use the getAddressString() to get the address, how can we obtain the address by hashing the public key?

```javascript
/***** address *****/

// step 2:  public_key_hash = Keccak-256(public_key)
const buff = Buffer.from(keccak256(pubKey), 'hex');

// step 3:  address = ‘0x’ + last 20 bytes of public_key_hash
address ="0x"+buff.slice(-20).toString('hex')

console.log("address:", address);
=> address:0x58ff6f058dc03acc447372d57b3e5721cdb0c0ac
```

#### (30%) c. There is a file called Keystore that is used to encrypt the private key and save in a JSON file. Can you generate a Keystore with the password “nccu”? You can find the details about Keystore below.

```json
{
  "version": 3,
  "id": "57d95ee2-6393-4254-bad5-ab68e9a9379e",
  "address": "58ff6f058dc03acc447372d57b3e5721cdb0c0ac",
  "crypto": {
    "ciphertext": "5839783e25447f62fb0d54094e953954ca41dcff625138cd0ee151c1c07b1b94",
    "cipherparams": { "iv": "34a93f28ec61f49dc6593c323ec72da7" },
    "cipher": "aes-128-ctr",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "salt": "2d279b5b8d61d9ae42ee54b73dac41f266483a359167538fd0fadb9df434d587",
      "n": 262144,
      "r": 8,
      "p": 1
    },
    "mac": "f6b1302e5a69cb97a2bde3d1f9bdb35591e597c7b1cd8dc1da78d252a736d4e5"
  }
}
```
