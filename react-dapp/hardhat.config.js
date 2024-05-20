require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: './src/artifacts',  // the artifact location for the compiled contracts
  },
  networks: {
    hardhat: {
      chainId: 1337  // due to a MetaMask configuration issue
    }
  }
};
