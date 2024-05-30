// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "hardhat/console.sol";

// This token is not ERC20 compliant
contract Token {
    string public name = "Bao Token";
    string public symbol = "BAO";
    uint public totalSupply = 1000000;
    mapping(address => uint) public balances;

    // the user who deploys the contract will get all the tokens
    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }

}
