//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "hardhat/console.sol";

// need gas fee when deploying the contract
contract Greeter {
  // sets a contract variable
  string greeting;

  constructor(string memory _greeting) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    greeting = _greeting;
  }

  // return the value of the greeting variable
  // reading
  // no gas fee, only executed by the connected node
  function greet() public view returns (string memory) {
    return greeting;
  }

  // interact with the user to update the greeting variable
  // writing/transaction
  // need gas fee
  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
