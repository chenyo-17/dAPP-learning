const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, World");

  // not ERC-20 compatible token
  // const Token = await hre.ethers.getContractFactory("Token");
  // const token = await Token.deploy();

  // ERC-20 compatible token
  const BaoBi = await hre.ethers.getContractFactory("BaoBi");
  const baobi = await BaoBi.deploy("BaoBi", "BaoBi");

  await greeter.waitForDeployment();
  // await token.waitForDeployment();
  // await greeter.deployed();  // not work for ethers v6

  console.log("contract successfully deployed to:", await greeter.getAddress());
  console.log("contract successfully deployed to:", await baobi.getAddress());
  // console.log("contract successfully deployed to:", await token.getAddress());
  // also not work for ethers v6
  // console.log(`contract successfully deployed to: ${greeter.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode(1);
  });
