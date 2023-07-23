import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractTransaction, Signer } from "ethers";
import {
  IERC20,
  IERC721,
  TGKMainContract,
  TGKNFTContract,
} from "../typechain-types";

describe("Running Tests...", function () {
  let owner: Signer;
  let contract: TGKMainContract;
  let nftContract: TGKNFTContract;
  let ownerAddress: string;
  let erc20Token: IERC20;
  let erc721Token: IERC721;

  const ERC20TokenAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
  const ERC721TokenAddress = "0x84629eb730e094B0fefA52DCEc2d7Aba53c276D3"; //Replace With Your NFT Address

  before(async function () {
    [owner] = await ethers.getSigners();

    ownerAddress = await owner.getAddress();

    erc20Token = (await ethers.getContractAt(
      "IERC20",
      ERC20TokenAddress
    )) as IERC20;

    erc721Token = (await ethers.getContractAt(
      "IERC721",
      ERC721TokenAddress
    )) as IERC721;

    const TGKMainContract = await ethers.getContractFactory("TGKMainContract");
    contract = (await TGKMainContract.deploy()) as TGKMainContract;
    await contract.deployed();

    const TGKNFTContract = await ethers.getContractFactory("TGKNFTContract");
    nftContract = (await TGKNFTContract.deploy(
      "Name",
      "Symbol"
    )) as TGKNFTContract;
    await nftContract.deployed();
  });

  describe("Tests for TGKMainContract", function () {
    it("Should have the correct owner", async function () {
      expect(await contract.owner()).to.equal(ownerAddress);
    });

    it("Should receive ERC20 Token", async function () {
      const amount = ethers.utils.parseUnits("1.0", 18);

      const transaction: ContractTransaction = await erc20Token
        .connect(owner)
        .transfer(contract.address, amount);
      await transaction.wait();

      expect(await contract.getERC20TokenBalance(ERC20TokenAddress)).to.equal(
        amount
      );
    });

    it("Should send ERC20 Token", async function () {
      const initialBalance = await contract.getERC20TokenBalance(
        ERC20TokenAddress
      );
      const amount = ethers.utils.parseUnits("0.5", 18);

      const transaction: ContractTransaction = await contract.transferERC20(
        ERC20TokenAddress,
        ownerAddress,
        amount
      );
      await transaction.wait();

      const finalBalance = await contract.getERC20TokenBalance(
        ERC20TokenAddress
      );

      expect(initialBalance.sub(finalBalance)).to.equal(amount);
    });

    it("Should transfer NFT", async function () {
      // Assume that the contract owns the Token with ID 1. Replace with Your Token ID
      const tokenID = 1;

      // Transfer NFT from the contract to the receiver
      const transaction: ContractTransaction = await contract.transferNFT(
        ERC721TokenAddress,
        ownerAddress,
        tokenID
      );
      await transaction.wait();

      // Check if the NFT is now owned by the receiver
      expect(await erc721Token.ownerOf(tokenID)).to.equal(ownerAddress);
    });
  });

  describe("Tests for TGKNFTContract", function () {
    it("Should have the correct owner", async function () {
      expect(await nftContract.owner()).to.equal(ownerAddress);
    });

    it("Should mint an NFT", async function () {
      const newItemID = 1;
      const tokenURI =
        "https://tengokusenso.s3.amazonaws.com/token_uri/1682933791553.json";

      // Mint an NFT with ID 1 and set its tokenURI
      const transaction: ContractTransaction = await nftContract.mintNFT(
        ownerAddress,
        tokenURI,
        newItemID
      );
      await transaction.wait();

      // Check if the NFT was minted and the tokenURI is set correctly
      const ownerOfNFT = await nftContract.ownerOf(newItemID);
      const tokenURIFromContract = await nftContract.tokenURI(newItemID);
      expect(ownerOfNFT).to.equal(ownerAddress);
      expect(tokenURIFromContract).to.equal(tokenURI);
    });
  });
});
