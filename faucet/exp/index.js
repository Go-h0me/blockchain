// 0x
// f8 - 248 bytes
// 6e - 110
// 82  = 130 -128 = 2bytes 
// 2e4b nonce

// 0x85 - 0x80 = 133 -128 = 5 bytes

// 85 081bbcc1ac -gasPrice

// 0x82 -0x80 = 2bytes

// 82 c350 - GAS limit

// 0x94 - 0x80 = 20 bytes
// 94 caee5153a453274d4f20177021c6f652845f9eb8 - to


// 0x88 - 0x80 = 8 bytes
// 88 3386fd3506a31e00 = value

// 80 - data


// 0x
// 01101110
// f8 = f7 + length of payload in binary from in bytes
// 6e = 110 bytes is payload
// 82
// 2e4b =nonce
// 0x85 -0x80 = 133 - 128 = 5bytes

// 85 081bbcc1ac - ga price

// 0x85 -0x80 = 5bytes

// 82 c350 - ga limit

//0x94 -0x80 = 20 bytes

// 94 caee5153a453274d4f20177021c6f652845f9eb8 - to

//0x88 -0x80 = 8 bytes

// 88 3386fd3506a31e00 - value

// 80 - data

// 0x26 -38 bytes is encoding itself
// 26 -v 1 bytes is encoded itself

// a0 - 0x80 = 160-128 = 32bytes

// a0 2b51a7b7d58322596f9c206da31da60abec2d6f8165d919b0299dcfafd1bad18 -r

// a0 0a6904e89665cd1ffb44dd5a5053aeceda281d63e3c6d2b7ca568e939289cadd; -s
// tim a0

// 1 nibble = 4 bits
// 1 byte = 8 bits

// Phai them 1 so 0 trong day

// const ethutil = require("ethereumjs-util");


const EthereumTx = require("ethereumjs-tx").Transaction;
// C9DC9ABEC70E23;
const txParam = {
  nonce: "0x02E4B",
  gasPrice: "0x081BBCC1AC", //9 +1 lap day
  gasLimit: "0xC350",
  to: "0xcaee5153a453274d4f20177021c6f652845f9eb8",
  value: "0x3386FD3506A31E00", //15 + 1 lap day
  data: "0x", //null , ""
  v: "0x26",
  r: "0x2b51a7b7d58322596f9c206da31da60abec2d6f8165d919b0299dcfafd1bad18",
  s: "0x0a6904e89665cd1ffb44dd5a5053aeceda281d63e3c6d2b7ca568e939289cadd",
};
const tx = new EthereumTx(txParam, { chain: "mainnet" });

// keccak256(public key)

const key = tx.getSenderPublicKey();
// keccak256(public key)
// lay 40 key ra duoc from
// d69459f5517517356b932803afadc4302f07e9460eb4c31ec741c0f3e308ff3a
// 0xafadc4302f07e9460eb4c31ec741c0f3e308ff3a
const address = tx.getSenderAddress();
const isValid = tx.verifySignature();

console.log("Public Key: ", key.toString("hex"));
console.log("Address: ", address.toString("hex"));
console.log("Is Valid: ", isValid);

const txParams = {
  nonce: "0x02E4B",
  gasPrice: "0x081BBCC1AC", //9 +1 lap day = 10 
  gasLimit: "0xC350",
  to: "0xcaee5153a453274d4f20177021c6f652845f9eb8",
  value: "0x3386FD3506A31E00", //15 + 1 lap day = 16 
  data: "0x", //null , ""
};
const tx2 = new EthereumTx(txParams, { chain: "mainnet" });

//lay privateKey accounts ganache
const privateKey = Buffer.from(
  "b1c3926cf27ad0d042a63971cd88535a75ee7abe2f75936f8013767de78ed771",
  "hex"
);

tx2.sign(privateKey)


const key2 = tx2.getSenderPublicKey();

// keccak256(public key)
// lay 40 key ra duoc from
// d69459f5517517356b932803afadc4302f07e9460eb4c31ec741c0f3e308ff3a

// 0xafadc4302f07e9460eb4c31ec741c0f3e308ff3a

const address2= tx2.getSenderAddress();
const isValid2 = tx2.verifySignature();

console.log("Public Key: ", key2.toString("hex"));
console.log("Address: ", address2.toString("hex"));
console.log("Is Valid: ", isValid2);