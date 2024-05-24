const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.waitForDeployment();
  // await nftMarketplace.deployed();
  console.log("nftMarketplace deployed to:", await nftMarketplace.getAddress());

  fs.writeFileSync(
    "./config.js",
    `
  export const marketplaceAddress = "${await nftMarketplace.getAddress()}";
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
