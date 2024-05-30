### Introduction

- This is another self-learning project from [Dapp-Learning](https://github.com/Dapp-Learning-DAO/Dapp-Learning/tree/main) to learn dAPP development.

### Basics

#### 01-03

- The first 3 examples introduce the basic workflow to deploy a contract to a chain, and interact with it with `web3.js`
  - `Infura`: provides a public access node to connect to different networks.
  - `web3.js`: a JS library to communicate with the node via JSON-RPC (remote process calls).
  - `solc`: a npm package to compile a Solidity contract.

- Without using any framework like hardhat, the workflow to create a contract-deploy transaction includes:
  - write the contract in a `.sol` file.
  - compile and export the compiled contract in `compile.js`.
  - import the contract in `index.js` and get the contract`bytecode` and `abi`.
    - `bytecode`: the machine code of the contract stored on the EVM
    - `abi`: the application binary interface describes how the `bytecode` is encoded and can be decoded to interact with.
  - create a `web3` client by specifying the provider node entrypoint.
  - create the contract instance with `const deployContract = web3.eth.Contract(abi)`.
  - create the contract-deploy transaction with `const deployTx = deployContract.deploy({data: "0x" + bytecode, arguments: [contractConstructArgs]})`

- depending on where the private key is stored, one can use different APIs to send the transaction.
    - store the private key in the `web3` client
        - `const accounts = web3.eth.accounts.wallet.add(privateKey)`
        - call `deployTx.send({from: accountAddr, gas})` to send the transaction, `web3` will find the stored private key that the `accoutAddr` matches and automatically signs the transaciton locally.
    - sign the transaciton explicitly
      - `const createTx = await wbe3.eth.accounts.signTransaction({data: deployTx.encodeABI()}, privateKey)`
      - `const receipt = awiat web3.eth.sendSignedTransaction(createTx.rawTransaction);`
      - get the contract address from `receipt.contractAddress`.
  
- To send a transaction to a deployed contract:
  - get the contract with `let incrementer = new web3.eth.Contract(abi, recepit.contractAddress)`.
    - `abi` is necessary to interact with a contract
  - call the static contract method with `let number = await incrementer.methos.getNumber().call()`, `getNumber()` is the function defined in the contract.
  - create a transaction to change the contract state with 
    ```Solidity
    let incrementTx = incrementer.methods.increment(3);
    let signedTx = await web3.eth.accounts.signTransaction({to: receipt.accountAddress, data: incrementTx.encodeABI()}, account_from: privateKey);
    // send signedTx
    ```
  
- one can also listen to the contract events, e.g., new transactions on the contract, see 03 `index.js` for details.
