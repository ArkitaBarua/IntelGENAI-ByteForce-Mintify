// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Carbon Credits Token
contract CarbonCredits is ERC20, Ownable {
    constructor() ERC20("Carbon Credits", "CC") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Initial supply
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

// Plant NFT Contract
contract PlantNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    CarbonCredits public carbonCredits;
    uint256 public constant PLANT_LIFESPAN = 75 weeks;
    uint256 public constant COMMISSION_RATE = 400; // 4%
    
    struct Plant {
        uint256 birthTime;
        uint256 sustenanceFactor; // Stored as integer, divide by 1000 for actual value
        uint256 regenerationFactor; // Stored as integer, divide by 1000 for actual value
        uint256 health;
        uint256 value;
        string name;
        bool isDead;
        address creator;
    }
    
    mapping(uint256 => Plant) public plants;
    mapping(address => uint256[]) public userPlants;
    
    event PlantCreated(uint256 tokenId, address owner, string name);
    event PlantDied(uint256 tokenId);
    event HealthUpdated(uint256 tokenId, uint256 newHealth);
    event ValueUpdated(uint256 tokenId, uint256 newValue);
    
    constructor(address _carbonCreditsAddress) ERC721("Garden Plants", "PLANT") {
        carbonCredits = CarbonCredits(_carbonCreditsAddress);
    }
    
    function createPlant(
        string memory _name,
        string memory _tokenURI,
        uint256 _sustenanceFactor,
        uint256 _regenerationFactor,
        uint256 _initialValue
    ) public returns (uint256) {
        require(_sustenanceFactor <= 1000, "Sustenance factor must be <= 1");
        require(_regenerationFactor <= 1000, "Regeneration factor must be <= 1");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        plants[newItemId] = Plant({
            birthTime: block.timestamp,
            sustenanceFactor: _sustenanceFactor,
            regenerationFactor: _regenerationFactor,
            health: 100,
            value: _initialValue,
            name: _name,
            isDead: false,
            creator: msg.sender
        });
        
        userPlants[msg.sender].push(newItemId);
        
        emit PlantCreated(newItemId, msg.sender, _name);
        return newItemId;
    }
    
    function updateHealth(uint256 tokenId, uint256 newHealth) public {
        require(_exists(tokenId), "Plant does not exist");
        require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Not authorized");
        
        plants[tokenId].health = newHealth;
        
        if (isPlantDead(tokenId) && !plants[tokenId].isDead) {
            plants[tokenId].isDead = true;
            emit PlantDied(tokenId);
        }
        
        emit HealthUpdated(tokenId, newHealth);
    }
    
    function updateValue(uint256 tokenId, uint256 newValue) public {
        require(_exists(tokenId), "Plant does not exist");
        require(msg.sender == owner(), "Only owner can update value");
        
        plants[tokenId].value = newValue;
        emit ValueUpdated(tokenId, newValue);
    }
    
    function isPlantDead(uint256 tokenId) public view returns (bool) {
        return (block.timestamp - plants[tokenId].birthTime >= PLANT_LIFESPAN) ||
               plants[tokenId].health == 0;
    }
    
    function getPlantsByOwner(address owner) public view returns (uint256[] memory) {
        return userPlants[owner];
    }
    
    function transferPlant(uint256 tokenId, address to) public {
        require(_exists(tokenId), "Plant does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        // Remove from sender's plants
        uint256[] storage senderPlants = userPlants[msg.sender];
        for (uint256 i = 0; i < senderPlants.length; i++) {
            if (senderPlants[i] == tokenId) {
                senderPlants[i] = senderPlants[senderPlants.length - 1];
                senderPlants.pop();
                break;
            }
        }
        
        // Add to receiver's plants
        userPlants[to].push(tokenId);
        
        _transfer(msg.sender, to, tokenId);
    }
    
    function calculateCommission(uint256 amount) public pure returns (uint256) {
        return (amount * COMMISSION_RATE) / 10000;
    }
}

// Marketplace Contract
contract NFTMarketplace is Ownable {
    PlantNFT public plantNFT;
    CarbonCredits public carbonCredits;
    
    struct Listing {
        uint256 tokenId;
        uint256 price;
        address seller;
        bool isActive;
    }
    
    mapping(uint256 => Listing) public listings;
    
    event PlantListed(uint256 tokenId, uint256 price, address seller);
    event PlantSold(uint256 tokenId, uint256 price, address seller, address buyer);
    event ListingCanceled(uint256 tokenId);
    
    constructor(address _plantNFTAddress, address _carbonCreditsAddress) {
        plantNFT = PlantNFT(_plantNFTAddress);
        carbonCredits = CarbonCredits(_carbonCreditsAddress);
    }
    
    function listPlant(uint256 tokenId, uint256 price) public {
        require(plantNFT.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(plantNFT.getApproved(tokenId) == address(this), "Marketplace not approved");
        
        listings[tokenId] = Listing({
            tokenId: tokenId,
            price: price,
            seller: msg.sender,
            isActive: true
        });
        
        emit PlantListed(tokenId, price, msg.sender);
    }
    
    function buyPlant(uint256 tokenId) public {
        Listing storage listing = listings[tokenId];
        require(listing.isActive, "Listing not active");
        
        uint256 commission = plantNFT.calculateCommission(listing.price);
        uint256 sellerAmount = listing.price - commission;
        
        // Transfer carbon credits
        require(carbonCredits.transferFrom(msg.sender, listing.seller, sellerAmount), "CC transfer failed");
        require(carbonCredits.transferFrom(msg.sender, owner(), commission), "Commission transfer failed");
        
        // Transfer NFT
        plantNFT.transferPlant(tokenId, msg.sender);
        
        listing.isActive = false;
        
        emit PlantSold(tokenId, listing.price, listing.seller, msg.sender);
    }
    
    function cancelListing(uint256 tokenId) public {
        require(listings[tokenId].seller == msg.sender, "Not the seller");
        require(listings[tokenId].isActive, "Listing not active");
        
        listings[tokenId].isActive = false;
        
        emit ListingCanceled(tokenId);
    }
}