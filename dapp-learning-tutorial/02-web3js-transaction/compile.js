const fs = require("fs");
const solc = require("solc");

// load the contract
const source = fs.readFileSync("Incrementer.sol", "utf8");

// compile the contract
const input = {
  language: "Solidity",
  sources: {
    "Incrementer.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractOfIncrementer =
  tempFile.contracts["Incrementer.sol"]["Incrementer"];

// export the contract so that it can be used in other files
module.exports = contractOfIncrementer;
