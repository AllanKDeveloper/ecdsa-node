const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')

const privateKey = secp.utils.randomPrivateKey()

console.log('private key:', toHex(privateKey))

const publicKey = secp.getPublicKey(privateKey)

console.log('\n ')
console.log('public key:', toHex(publicKey))

// private key: 3322643d46f5c9ceae46ecaf05dcf21719f2f99784822e26fc3d19d2de7f8e86
// public key: 04a58fb66cbefe4a2af9cd57888c0b5af0105b155cfa2c906dccd3954fb40aac6ef11a6255793b765d0949887eef8d1e536761893529ee5e57d36da14eabf43ca7

// private key: 41005680304864685e9b9e7bea8bb9a41ecea179acf1bc92ac1e3ea22091204b
// public key: 047e555f90d81459cc92946fce75a3f775224a52545fd8d1e3a2f76aa9a6aae70af02d11bdcc5444461d6deac306f0b25a6b51f26ce47a9f4f2dfcd2ae893099e6

// private key: 58c4bac24f54dc30b15e2b236be3fa82852fda77ae80132229d6f967d0ac7209
// public key: 044e50fcba2a88826e3c55fb66efa61805d2793ec810afff2dba42af95d907d5059716a045242a4dd309b8e0fec9188c7d6741f763bc74940a5d27861344256bc1
