// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract BaoBi is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // ERC20 sets the number of decimals to 18 by default
        // 1000000 BAOBI, 1 BAOBI = 10^18 wei
        _mint(msg.sender, 100000 * (10 ** 18));
    }

    // any ERC-20 compliant token has the following functions
    // function name() public view returns (string)
    // function symbol() public view returns (string)
    // function decimals() public view returns (uint8)
    // function totalSupply() public view returns (uint256)
    // function balanceOf(address _owner) public view returns (uint256 balance)
    // function transfer(address _to, uint256 _value) public returns (bool success)
    // function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    // function approve(address _spender, uint256 _value) public returns (bool success)
    // function allowance(address _owner, address _spender) public view returns (uint256 remaining)

}
