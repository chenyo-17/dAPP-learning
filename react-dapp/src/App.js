import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
import { ethers } from "ethers"; // not work for ethers v6
import { JsonRpcProvider, Contract } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/BaoBi.sol/BaoBi.json";
// import Token from "./artifacts/contracts/Token.sol/Token.json";

// the contract address
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const tokenAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

function App() {
  // store local state values from the input functions
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // get the current token balance of the connected account
  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new JsonRpcProvider("http://localhost:8545");
      const contract = new Contract(tokenAddress, Token.abi, provider);
      // call a contract function
      // for an ERC-20 compliant token, the function is built-in
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  // send tokens
  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new JsonRpcProvider("http://localhost:8545");
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      // also built-in for ERC-20 tokens
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} coins successfully sent to ${userAccount}`);
    }
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new JsonRpcProvider("http://localhost:8545");
      const contract = new Contract(greeterAddress, Greeter.abi, provider);
      // // not work for ethers v6
      // // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // // const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      // the local network runs on port 8545
      const provider = new JsonRpcProvider("http://localhost:8545");
      const signer = await provider.getSigner();
      // need to wait first
      // const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      // call the contract function
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        {/* <button onClick={getBalance}>Get Balance</button> */}
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
          value={greeting}
        />
        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}

export default App;
