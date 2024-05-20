import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
// import { ethers } from "hardhat";  // not work!!!
import { ethers } from "ethers"; // not work for ethers v6
import { JsonRpcProvider, Contract } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

// the contract address
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // get the current balance of the connected account
  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new JsonRpcProvider("http://localhost:8545");
      const balance = await provider.getBalance(account);
      console.log("Balance: ", ethers.formatUnits(balance, "ether"));
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
        <button onClick={getBalance}>Get Balance</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
          value={greeting}
        />
      </header>
    </div>
  );
}

export default App;
