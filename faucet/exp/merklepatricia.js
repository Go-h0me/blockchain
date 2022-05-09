const Trie = require("merkle-patricia-tree").SecureTrie; // We import the library required to create a basic Merkle Patricia Tree
const { BranchNode } = require("merkle-patricia-tree/dist/trieNode");

const { keccak256 } = require("ethereumjs-util");

var trie = new Trie(); // We create an empty Patricia Merkle Tree

const traverseTrie = (node) => {
  trie.walkTrie(node, (_, node) => {
    if (node) {
      console.log(node);
      console.log(node.hash().toString("hex"));
      if (node instanceof BranchNode) {
        for (let i = 0; i < 16; i++) {
          const buffer = node.getBranch(i);

          if (buffer && buffer.length > 0) {
            traverseTrie(buffer);
          }
        }
      }
    }
  });
};

async function test() {
  await trie.put(
    Buffer.from("32fa7b"),
    //ASCII Text to Hex 31 30
    Buffer.from("10")
  );
  await trie.put(
    Buffer.from("32fa7c"),
    // ASCII Text to Hex 32 30
    Buffer.from("20")
  );

  traverseTrie(trie.root);

  console.log("Root Hash: ", trie.root.toString("hex"));

  // const path = await trie.findPath(keccak256(Buffer.from("32fa7b")));
  // console.log("NODE: ",keccak256(path.node.serialize()));

  // console.log("NODE: ", path.node.value.toString("hex"));
  // console.log("NODE: ", path.node.value.toString("ascii"));
}

test();

// cach 1
// Keccak256(32fa7c) as a String
// 4f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// add 20 hex prefix if nibbles are even
//20 4f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// a1 là đại diện
// 0x80 + 33 bytes = a1
// a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// 0x80 + 2 = 82
// a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

// 0xc0 + 37 =  e5
// e5a1204f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

//  keccak256(RLP)
//  hex to ascii - hex- to text

// cach 2

//  Keccak256(32fa7c) as a String
//  4 is Stored in the Branch Node
// 4 f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2

// RLP - 20 if number is even, 3 if number is add
//  0x80 + 32 = 160 chuyen tu decimal sang hexcimal = a0 +82 + 3230

// 0xc0 +36 = e4

// e4a03f6c1c50fde5f5d4f20c2979974a8f465b24e65062f02ef80f722200f35105e2823230

//  keccak256(32fa7b)
//  3 is Stored in the Branch Node
//3 3865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1

// RLP - 20 if number is even, 3 if number is add

// e4a033865e1f181df18d1fff8847c6298e5b2c621a56f368e030e8ead670c8b01aa1823130

// keccak256(RLP)
// 2fd2c9e2e74e9d07a920dd1ebf94f1bd7a5aa1764464769c83ce1cbb38137d65

//Branch Node
// RLP

// 10000001
//f7 + 1

// f851808080a02fd2c9e2e74e9d07a920dd1ebf94f1bd7a5aa1764464769c83ce1cbb38137d65a0b7f631fbd6cfb1aeb19411e75fc33769934c7ea2242a47b54ed6895e9627a0fc808080808080808080808080 

// keccak256()93267434a14288490332f997cb13123bb68609112edbd06f6e8c7c9798fd20c6