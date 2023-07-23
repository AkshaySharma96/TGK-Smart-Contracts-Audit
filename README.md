# TGKMainContract Documentation

## Overview

TGKMainContract is a Solidity smart contract that facilitates the transfer and management of Ethereum-based tokens and ERC-721 Non-Fungible Tokens (NFTs). The contract provides functions to handle Ether, ERC-20 tokens, and ERC-721 NFTs. It allows the owner of the contract to withdraw Ether and ERC-20 tokens, as well as transfer ERC-721 NFTs to other addresses.

## Contract Details

- **License**: UNLICENSED (This contract does not have a specified license)

- **Solidity Version**: 0.8.18

## Contract Functions

### 1. `constructor()`

- **Visibility**: Public
- **Description**: The constructor function initializes the contract and sets the deployer's address as the contract owner.

### 2. `receive()`

- **Visibility**: External
- **Description**: This function is a fallback function that allows the contract to receive Ether payments. It emits a `TransferReceived` event when Ether is received.

### 3. `withdraw(uint256 amount, address payable to)`

- **Visibility**: Public
- **Modifiers**: `onlyOwner`
- **Parameters**:
  - `amount` (uint256): The amount of Ether to withdraw from the contract.
  - `to` (address payable): The address to which the Ether will be transferred.
- **Description**: This function allows the contract owner to withdraw a specified amount of Ether from the contract. It verifies that the contract has sufficient balance and that the provided address is valid. Upon successful withdrawal, it emits a `TransferSent` event.

### 4. `transferERC20(IERC20 token, address to, uint256 amount)`

- **Visibility**: Public
- **Modifiers**: `onlyOwner`
- **Parameters**:
  - `token` (IERC20): The ERC-20 token contract address.
  - `to` (address): The address to which the ERC-20 tokens will be transferred.
  - `amount` (uint256): The amount of ERC-20 tokens to transfer.
- **Description**: This function allows the contract owner to transfer ERC-20 tokens held by the contract to a specified address. It checks if the contract has sufficient balance of the specified ERC-20 token. Upon successful transfer, it emits a `TransferSent` event.

### 5. `getERC20TokenBalance(IERC20 token)`

- **Visibility**: Public
- **Parameters**:
  - `token` (IERC20): The ERC-20 token contract address.
- **Description**: This function allows anyone to get the balance of a specific ERC-20 token held by the contract.

### 6. `transferNFT(address nftContractAddress, address receiverAddress, uint256 tokenID)`

- **Visibility**: Public
- **Modifiers**: `onlyOwner`
- **Parameters**:
  - `nftContractAddress` (address): The address of the ERC-721 NFT contract.
  - `receiverAddress` (address): The address of the recipient who will receive the ERC-721 NFT.
  - `tokenID` (uint256): The ID of the ERC-721 NFT to be transferred.
- **Description**: This function allows the contract owner to transfer an ERC-721 NFT held by the contract to a specified address. It verifies that the contract is the current owner of the specified ERC-721 token. Upon successful transfer, it emits an `NFTTransferred` event.

### 7. `onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)`

- **Visibility**: External
- **Parameters**:
  - `operator` (address): The address which called the `safeTransferFrom` function in the ERC-721 contract.
  - `from` (address): The address which previously owned the ERC-721 token.
  - `tokenId` (uint256): The ID of the ERC-721 token being transferred.
  - `data` (bytes): Additional data with no specified format.
- **Description**: This function is an ERC-721 callback function to receive ERC-721 tokens. The function always returns the ERC-721 `onERC721Received.selector`.

## Events

### 1. `TransferReceived(address indexed from, uint256 amount)`

- **Description**: This event is emitted when the contract receives Ether. It indicates the sender's address and the amount of Ether received.

### 2. `TransferSent(address indexed from, address indexed to, uint256 amount)`

- **Description**: This event is emitted when Ether or ERC-20 tokens are sent from the contract to another address. It indicates the sender's address, the recipient's address, and the amount sent.

### 3. `NFTTransferred(address nftContractAddress, address receiverAddress, uint256 tokenID)`

- **Description**: This event is emitted when an ERC-721 NFT is transferred from the contract to another address. It indicates the ERC-721 contract address, recipient's address, and the ID of the transferred NFT.

## Modifiers

### 1. `onlyOwner()`

- **Description**: This modifier restricts the execution of certain functions to only the contract owner. If anyone else attempts to call a function with this modifier, the transaction will revert with the message "Only owner can call this function."

## Security Considerations

- The contract allows the owner to withdraw Ether and transfer ERC-20 tokens. Ensure that the contract owner is a trusted entity to prevent unauthorized access to funds.
