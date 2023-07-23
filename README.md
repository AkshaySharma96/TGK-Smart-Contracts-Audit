# Project Execution Guide

Below are the steps to get this project up and running:

## Compilation
1. Start by renaming the file `.env.sample` to `.env`.
2. Fill in the necessary values within the newly christened `.env` file.
3. Run the following commands in your terminal from the root directory:

```bash
npm install
npx hardhat compile
```

## Testing
To run the tests for our project, run the following command:

```bash
npx hardhat test
```

# TGKMainContract Documentation

## Overview

TGKMainContract is a Solidity smart contract that facilitates the transfer and management of Ethereum-based tokens and ERC-721 Non-Fungible Tokens (NFTs). The contract provides functions to handle Ether, ERC-20 tokens, and ERC-721 NFTs. It allows the owner of the contract to withdraw Ether and ERC-20 tokens, as well as transfer ERC-721 NFTs to other addresses.

## Contract Details

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


# TGKNFTContract Documentation

## Overview

TGKNFTContract is a Solidity smart contract that represents an ERC-721 Non-Fungible Token (NFT) with additional features from OpenZeppelin's ERC721 extensions. The contract allows the owner to mint NFTs, transfer ownership, and manage metadata for the tokens.

## Contract Details

- **Solidity Version**: 0.8.18

## Contract Inheritance

This contract inherits from the following OpenZeppelin contracts:

1. ERC721: This contract implements the ERC-721 standard for NFTs.
2. ERC721URIStorage: This contract extends ERC721 and adds support for managing token metadata URIs.
3. ERC721Enumerable: This contract extends ERC721URIStorage and adds support for querying NFTs by index.

## Contract Functions

### 1. `constructor(string memory name, string memory symbol)`

- **Visibility**: Public
- **Parameters**:
  - `name` (string): The name of the NFT contract.
  - `symbol` (string): The symbol (ticker) of the NFT contract.
- **Description**: The constructor function initializes the contract and sets the deployer's address as the contract owner. It also sets the name and symbol of the NFT contract.

### 2. `mintNFT(address _nftReceiver, string memory _tokenURI, uint256 _newItemID)`

- **Visibility**: Public
- **Modifiers**: `onlyOwner`
- **Parameters**:
  - `_nftReceiver` (address): The address of the recipient who will receive the minted NFT.
  - `_tokenURI` (string): The metadata URI of the NFT, which provides additional information about the token.
  - `_newItemID` (uint256): The unique ID of the newly minted NFT.
- **Description**: This function allows the contract owner to mint a new ERC-721 NFT and transfer ownership to the specified `_nftReceiver`. The function also sets the metadata URI for the minted NFT. Upon successful minting, it emits an `NFTCreated` event.

### 3. `_beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)`

- **Visibility**: Internal
- **Overrides**: ERC721, ERC721Enumerable
- **Parameters**:
  - `from` (address): The address from which the NFTs are being transferred.
  - `to` (address): The address to which the NFTs are being transferred.
  - `tokenId` (uint256): The ID of the NFT being transferred.
  - `batchSize` (uint256): The number of NFTs being transferred (for batch transfers).
- **Description**: This internal function is an override to manage token transfers. It ensures that token transfers comply with ERC-721 and ERC-721Enumerable standards.

### 4. `_burn(uint256 tokenId)`

- **Visibility**: Internal
- **Overrides**: ERC721, ERC721URIStorage
- **Parameters**:
  - `tokenId` (uint256): The ID of the NFT being burned (destroyed).
- **Description**: This internal function is an override to handle the burning (destruction) of ERC-721 tokens. It ensures that the token is safely burned and removed from the contract.

### 5. `tokenURI(uint256 tokenId)`

- **Visibility**: Public
- **Overrides**: ERC721, ERC721URIStorage
- **Parameters**:
  - `tokenId` (uint256): The ID of the NFT.
- **Returns**: `string`: The metadata URI associated with the specified token ID.
- **Description**: This function allows anyone to get the metadata URI associated with a specific NFT.

### 6. `supportsInterface(bytes4 interfaceId)`

- **Visibility**: Public
- **Overrides**: ERC721, ERC721URIStorage, ERC721Enumerable
- **Parameters**:
  - `interfaceId` (bytes4): The interface ID to check support for.
- **Returns**: `bool`: `true` if the contract supports the given interface, otherwise `false`.
- **Description**: This function checks if the contract supports a given interface by its interface ID.

## Events

### 1. `NFTCreated(address _nftOwner, uint256 _nftID)`

- **Description**: This event is emitted when a new NFT is minted using the `mintNFT` function. It indicates the address of the NFT owner and the ID of the minted NFT.

## Modifiers

### 1. `onlyOwner()`

- **Description**: This modifier restricts the execution of certain functions to only the contract owner. If anyone else attempts to call a function with this modifier, the transaction will revert with the message "Only owner can call this function."

## Security Considerations

- The contract allows the owner to mint NFTs. Ensure that the contract owner is a trusted entity to prevent unauthorized minting of NFTs.

#Roles and Ownership

Based on the smart contracts, the system has two main roles:

1. **Owner**: The owner is the address that deployed the `TGKMainContract` and `TGKNFTContract` contracts. The owner has special privileges and can perform certain functions that regular users cannot.

2. **Regular Users**: Regular users are addresses other than the owner. They do not have any special privileges and can only interact with the system through the functions provided by the contracts.

Let's explore the capabilities of each role:

**Owner Role**:
The owner has full control over the system and can perform the following actions:

1. `withdraw(uint256 amount, address payable to)`: The owner can withdraw Ether from the contract balance and send it to any specified address.

2. `transferERC20(IERC20 token, address to, uint256 amount)`: The owner can transfer ERC20 tokens (specified by the `IERC20` interface) from the contract balance to any specified address.

3. `transferNFT(address nftContractAddress, address receiverAddress, uint256 tokenID)`: The owner can transfer an NFT (specified by the `IERC721` interface) from the contract to a specified receiver address.

4. `mintNFT(address _nftReceiver, string memory _tokenURI, uint256 _newItemID)`: The owner can mint new NFTs using the `TGKNFTContract`. This function allows the owner to create and assign an NFT with a given token ID and token URI to a specified receiver address.

**Regular User Role**:
Regular users have limited access and can only receive funds and NFTs. They cannot execute any of the functions reserved for the owner, such as withdrawing funds or transferring tokens.

1. `receive() external payable`: Regular users can receive Ether and trigger the `TransferReceived` event when they send Ether to the contract address.

2. The `TGKNFTContract` contract allows regular users to receive NFTs created by the owner using the `mintNFT` function. Regular users can't mint NFTs themselves or transfer NFTs from the contract.

In summary, the owner of the system has complete control over the contract's funds, can transfer ERC20 tokens, and can mint and transfer NFTs. Regular users can receive Ether and NFTs but do not have control over the contract's functionalities or balances.
