const express = require('express')
const app = express()
const cors = require('cors')
const secp = require('ethereum-cryptography/secp256k1')
const {
  toHex,
  utf8ToBytes,
  hexToBytes,
} = require('ethereum-cryptography/utils')
const { keccak256 } = require('ethereum-cryptography/keccak')
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  '04a58fb66cbefe4a2af9cd57888c0b5af0105b155cfa2c906dccd3954fb40aac6ef11a6255793b765d0949887eef8d1e536761893529ee5e57d36da14eabf43ca7': 100,
  '047e555f90d81459cc92946fce75a3f775224a52545fd8d1e3a2f76aa9a6aae70af02d11bdcc5444461d6deac306f0b25a6b51f26ce47a9f4f2dfcd2ae893099e6': 50,
  '044e50fcba2a88826e3c55fb66efa61805d2793ec810afff2dba42af95d907d5059716a045242a4dd309b8e0fec9188c7d6741f763bc74940a5d27861344256bc1': 75,
}

app.get('/balance/:address', (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post('/send', (req, res) => {
  const { message, signature, recoveryBit } = req.body
  const { recipient, amount } = message
  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))))
  const publicKey2 = secp.recoverPublicKey(
    messageHash,
    hexToBytes(signature),
    recoveryBit
  )
  const sender = toHex(publicKey2)

  setInitialBalance(sender)
  setInitialBalance(recipient)

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' })
  } else {
    balances[sender] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[sender] })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
