### Introduction

- This is a self-learning project to understand the development stack of dAPP. Note that this tutorial was published in 2022 and much information is out-of-date:
  - `ethers.js v6` changed many function APIs compared to `ethers.js v5` in 2022.
  - `hardhat` initialized a different project structure, e.g., `ignition/` instead of `scripts/`
  - Before restarting `npx hardhat node`, if some transactions were recorded in the Metamask on any account, one needs to first change the Metamask to a different network and then changes back after the node is running. Otherwise the node will report block number error. ([source](https://ethereum.stackexchange.com/questions/109625/received-invalid-block-tag-87-latest-block-number-is-0?newreg=3008b56bec3649d3901e0321240fbf22))

- Project source:
    - [Web tutorial](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-web3-development-4g74)
    
- Test network: Sepolia (other test networks on the tutorial no longer exist)
  - Get Test ETH: [Chainlink](https://faucets.chain.link/)

### Installed packages (2024)

- `ethers v6`: A library for interacting with the Ethereum blockchain and its ecosystem, including functionalities for wallets, contracts, providers and utilities. Used for writing scripts and front-end code that interacts with Ethereum smart contracts.

- `hardhat v2.22`: A development enviornment for compiling, deploying, testing and debugging Ethereum software. Used as a framework for developing smart contracts, managing the development process, and running tests.

- `hardhat-toolbox`: Includes essential plugins for developing and testing

### Workflow (2022)

#### [Tutorial 1](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)

1. Write the contract with Solidity in `Contracts/` and compile it with `npx hardhat compile` to generate ABI.

2. Start the local network with `npx hardhat node`

3. Deploy the contract to the local network with `npx hardhat run scripts/deploy.js --network localhost`
  - In the newer hardhat version, the contract is deployed automatically with `ignition`.
  
4. Write the react app in `src/App.js` and run it with `npm start`

5. Deploy the contract to a test network, e.g., Sepolia and check the transaction on [etherscan](https://sepolia.etherscan.io/)

6. Deploy own token with/without ERC20 library
 
#### [Tutorial 2](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)

1. Write a simple NFT market contract that inherits ERF721 standard and test its functionalities with `npx hardhat test`

2. Deploy the contract to the local network and write a `next` app to upload tokens on IPFS.
  - `ipfs.infura.io` in the tutorial does not exist
  - `pinata`'s API allows uploading JSON, but always has the `Invalid request` error when uploading a file, both with `curl` and with the API. Simply uploading the file via its website does not return the correct `tokenURI`.
  - there are other [public gateways](https://ipfs.github.io/public-gateway-checker/), but I always get error for `Cross-Origin Request Blocked: CORS header missing`.

#### [Tutorial 3](https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)

#### [Tutorial 4](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-web3-development-4g74)



