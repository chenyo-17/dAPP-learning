const hre = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    // deploy the marketplace contract
    const NFTMarketplace =
      await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();
    // await nftMarketplace.deployed()

    let listingPrice = await nftMarketplace.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = hre.ethers.parseUnits("1", "ether");

    // create two tokens
    // token id 1
    await nftMarketplace.createToken(
      "https://www.mytokenlocation.com", // token uri
      auctionPrice,
      { value: listingPrice }, // declare `msg.value`
    );
    // token id 2
    await nftMarketplace.createToken(
      "https://www.mytokenlocation2.com",
      auctionPrice,
      { value: listingPrice },
    );

    // why multiple signers?
    const [_, buyerAddress] = await hre.ethers.getSigners();

    // the buyer buys the token 1
    await nftMarketplace
      .connect(buyerAddress)
      .createMarketSale(1, { value: auctionPrice });

    // the buyer resells the token 1
    await nftMarketplace
      .connect(buyerAddress)
      .resellToken(1, auctionPrice, { value: listingPrice });

    // return all unsold tokens
    items = await nftMarketplace.fetchMarketItems();
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nftMarketplace.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      }),
    );
    console.log("items: ", items);
  });
});
