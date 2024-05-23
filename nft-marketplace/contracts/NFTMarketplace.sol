// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

// no more `Counters.sol` in OpenZeppelin 5.0
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    uint256 private _tokenIds = 0;
    uint256 private _itemSold = 0;
    // Counters.Counter private _tokenIds;
    // Counters.Counter private _itemSold;

    // when a seller puts on a NFT, it transfers the listing price
    // to the marketplace owner every time the NFT is sold
    uint256 listingPrice = 0.025 ether;
    address payable owner;

    // define a map
    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // who creates the contract is the owner of the marketplace
    constructor() ERC721("Metaverse Tokens", "NFTM") {
        owner = payable(msg.sender);
    }

    // `payable` function changes the contract state
    function updateListingPrice(uint _listingPrice) public payable {
        require(owner == msg.sender, "Only marketplace owner can update listing price");
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds = _tokenIds + 1;
        // _tokenIds.increment();
        uint256 newTokenId = _tokenIds;
        // uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    // create a new item which is not recorded before
    function createMarketItem (uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),  // the owner of the NFT is the marketplace
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);  // transfer the NFT ownership.
        // broadcast the event
        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    // Allow someone to resell a token they have bought
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idToMarketItem[tokenId].owner == msg.sender,
                "Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        // the token is already recorded as it was sold from the marketplace before
        // same token id
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemSold = _itemSold - 1;
        // _itemSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // Sell a token to a buyer
    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;
        require(msg.value == price,
                "Please submit the asking price in order to complete the purchase");
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        // since the token is sold, the seller (the marketplace) is not cared
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemSold = _itemSold + 1;
        // _itemSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        // when is the price stored in the contract?
        // // transfer from the current contract to the market owner
        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    // Get all unsold items
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemSold;
        // uint itemCount = _itemSold.current();
        uint currentIndex = 0;

        // count unsold items
        MarketItem[] memory items = new MarketItem[](_tokenIds - itemCount);
        for (uint i = 1; i <= _tokenIds; i++) {
            // If the owner is not the marketplace, then it is sold
            if (idToMarketItem[i].owner == address(this)) {
                uint currentId = idToMarketItem[i].tokenId;
                // need to declare the storage variable so `items` can get access
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Get items a user has purchased
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds;
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      // have to pre-allocate the memory
      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    // Get items a user has listed
    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds;
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

}
