const hre = require("hardhat");

async function main() {
    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, World");
    await greeter.waitForDeployment();
    // await greeter.deployed();  // not work for ethers v6

    console.log("contract successfully deployed to:", await greeter.getAddress());
    // also not work for ethers v6
    // console.log(`contract successfully deployed to: ${greeter.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
});
