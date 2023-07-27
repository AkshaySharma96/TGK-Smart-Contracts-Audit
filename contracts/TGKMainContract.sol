// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract TGKMainContract {
    address public owner;

    event TransferReceived(address indexed from, uint256 amount);
    event TransferSent(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event NFTTransferred(
        address nftContractAddress,
        address receiverAddress,
        uint256 tokenID
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit TransferReceived(msg.sender, msg.value);
    }

    function withdraw(uint256 amount, address payable to) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient funds");
        require(to != address(0), "Invalid address");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");

        emit TransferSent(msg.sender, to, amount);
    }

    function transferERC20(
        IERC20 token,
        address to,
        uint256 amount
    ) public onlyOwner {
        uint256 erc20Balance = token.balanceOf(address(this));
        require(amount <= erc20Balance, "Insufficient Funds");
        SafeERC20.safeTransfer(token, to, amount);
        emit TransferSent(msg.sender, to, amount);
    }

    function getERC20TokenBalance(IERC20 token) public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function transferNFT(
        address nftContractAddress,
        address receiverAddress,
        uint256 tokenID
    ) public onlyOwner {
        require(
            IERC721(nftContractAddress).ownerOf(tokenID) == address(this),
            "You are not the owner of the NFT"
        );

        IERC721(nftContractAddress).safeTransferFrom(
            address(this),
            receiverAddress,
            tokenID
        );
        emit NFTTransferred(nftContractAddress, receiverAddress, tokenID);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
