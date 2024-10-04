/* eslint-disable jest/valid-expect */
const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("NFTMarketplace", function() {
    let deployer, addr1, addr2, NFT, Marketplace, nft, marketplace, feePercent = 1;
    let URI = "Sample URI";

    beforeEach(async function() {
        // get contract factories
        NFT = await ethers.getContractFactory("NFT");
        Marketplace = await ethers.getContractFactory("Marketplace");

        // get signers
        [deployer, addr1, addr2] = await ethers.getSigners();

        // deploy contracts
        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent);
    });

    // Add your tests here

    describe("Deployment", function() {
        it("Should track the name and symbol of the nft collection", async function() {
            expect(await nft.name()).to.equal("NFT");
            expect(await nft.symbol()).to.equal("NFT");
        });
        it("Should track the fee percent of the marketplace", async function() {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        });
    });

    describe("Minting NFTs", function() {
        it("Should track each minted nft", async function() {
            await nft.connect(addr1).mint(URI);
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);
            await nft.connect(addr1).mint(URI);
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr1.address)).to.equal(2);
            expect(await nft.tokenURI(2)).to.equal(URI);
        });
    });

    describe("Making marketplace items", function() {
        beforeEach(async function() {
            await nft.connect(addr1).mint(URI);
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
        });
        it("Should track newly created items, transfer NFT from seller to marketplace and emit Offered event", async function() {
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1, toWei(1)))
                .to.emit(marketplace, "Offered")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    toWei(1),
                    addr1.address
                )
            
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            expect(await marketplace.itemCount()).to.equal(1);

            const item = await marketplace.items(1);
            expect(item.itemId).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            expect(item.tokenId).to.equal(1);
            expect(item.price).to.equal(toWei(1));
            expect(item.seller).to.equal(addr1.address);
            expect(item.Sold).to.equal(false);
        });

        it("Should fail if the price is zero", async() => {
            await expect(
                marketplace.connect(addr1).makeItem(nft.address, 1, 0)
            ).to.be.revertedWith("Price must be greater than 0");
        });
    });
    describe("Purchasing marketplace items", () =>{
        let price = 10;
        let totalWeiPrice;
        beforeEach(async () => {
            await nft.connect(addr1).mint(URI);
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
            await marketplace.connect(addr1).makeItem(nft.address, 1, toWei(price));
        });
        it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async () => {
            const initialBalance = await addr1.getBalance();
            const feeAccountInitialBalance = await deployer.getBalance();
            console.log("Initial balance: ", fromWei(initialBalance));
            console.log("Fee account initial balance: ", fromWei(feeAccountInitialBalance));

            totalWeiPrice = await marketplace.getTotalPrice(1);
            console.log("Total price: ", fromWei(totalWeiPrice));

            await expect(marketplace.connect(addr2).purchaseItem(1, {value: totalWeiPrice}))
                .to.emit(marketplace, "Bought")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    toWei(price),
                    addr1.address,
                    addr2.address
                );
            const finalBalance = await addr1.getBalance();
            const feeAccountFinalBalance = await deployer.getBalance();
            console.log("Final balance: ", fromWei(finalBalance));
            console.log("Fee account final balance: ", fromWei(feeAccountFinalBalance));
            const fee = price * feePercent / 100;
            console.log("Fee: ", fee);
            expect(+fromWei(finalBalance)).to.equal(+ price + +fromWei(initialBalance));
            expect(+fromWei(feeAccountFinalBalance)).to.be.equal(+ fee + +fromWei(feeAccountInitialBalance));
            expect(await nft.ownerOf(1)).to.equal(addr2.address);
            expect((await marketplace.items(1)).Sold).to.equal(true);
        });
        it("Should fail for invalid item ids, sold items and when not enough ether is paid", async () => {
            await expect(
                marketplace.connect(addr2).purchaseItem(2, {value: totalWeiPrice})
            ).to.be.revertedWith("Item does not exist");
            await expect(
                marketplace.connect(addr2).purchaseItem(0, {value: totalWeiPrice})
            ).to.be.revertedWith("Item does not exist");
            await expect(
                marketplace.connect(addr2).purchaseItem(1, {value: toWei(price - 1)})
            ).to.be.revertedWith("Not enough funds sent");
            await marketplace.connect(addr2).purchaseItem(1, {value: totalWeiPrice});
            await expect(
                marketplace.connect(addr2).purchaseItem(1, {value: totalWeiPrice})
            ).to.be.revertedWith("Item is already sold");
        });
    });

});