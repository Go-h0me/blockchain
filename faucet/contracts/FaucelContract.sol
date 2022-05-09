// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {
    uint256 public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint256 => address) private lutFunders;

    modifier limitWithdraw(uint256 withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ether"
        );
        _;
    }

    //private -> can be accesible only within the smart contract
    // internal -> can be accesible within smart contract and also derived smart contract
    receive() external payable {}

    //logger lay tai logger
    function emitLog() public pure override returns (bytes32) {
        return "Hello World";
    }

    // function transferOwnership(address newOwner) external onlyOwner {
    //     owner = newOwner;
    // }

    function addFunds() external payable override {
        // uint index = numOfFunders++;
        address funder = msg.sender;
        // truyen function accessors
        test3();

        if (!funders[funder]) {
            uint256 index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function test1() external {
        //some managing stuff that only admin should have access
    }

    function test2() external {
        //some managing stuff that only admin should have access
    }

    function withdraw(uint256 withdrawAmount)
        external
        override
        limitWithdraw(withdrawAmount)
    {
        // require(
        //     withdrawAmount <= 100000000000000000,
        //     "Cannot withdraw more than 0.1 ether"
        // );
        // if(withdrawAmount < 1000000000000000000) {

        payable(msg.sender).transfer(withdrawAmount);
        // }
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }
}
// function getAllFunders() public view returns (address[] memory) {
//     return funders;
// }

// const instance = await Faucet.deployed()
// instance.addFunds({from: accounts[0],value: "2000000000000000000"})
// instance.addFunds({from: accounts[1],value: "2000000000000000000"})
// instance.withdraw("100000000000000000",{from: accounts[1]})
// instance.getAllFunders()
