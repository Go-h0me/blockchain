// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    //keccak256(key . slot)

    mapping(uint256 => uint256) public aa; // slot 0
    mapping(address => uint256) public bb; //slot 1

    // keccak256(slot) + index of the item
    uint256[] public cc; //slot 2 //64 tu

    uint8 public a = 7; //1byte
    uint16 public b = 10; // 2bytes
    address public c = 0x47Db40dab0f2bec83113e1af0af6b42674acE6dd; //20bytes
    bool d = true; // 1byte
    uint64 public e = 15; //8 bytes
    //32 bytes,all value will be stored in slot 3
    // 0x 0f 01 47db40dab0f2bec83113e1af0af6b42674ace6dd 000a 07

    uint256 public f = 200; //32bytes // slot 4

    uint8 public g = 40; // 1byte -> slot 5

    uint256 public h = 789; // 32bytes -> slot 6

    constructor() {
        cc.push(1); //0
        cc.push(10); // +1
        cc.push(100); // +2

        aa[2] = 4;
        aa[3] = 10;
        bb[0x47Db40dab0f2bec83113e1af0af6b42674acE6dd] = 100;
    }
}

//0x00000000000000000000000047Db40dab0f2bec83113e1af0af6b42674acE6dd0000000000000000000000000000000000000000000000000000000000000001

// 00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000

// 29102676481673041902632991033461445430619272659676223336789171408008386403022 + 1 +1

// 0x655Ce819B187639a9c49A6AbB6443741154B78A0