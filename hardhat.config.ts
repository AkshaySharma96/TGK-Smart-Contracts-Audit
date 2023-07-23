import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const { API_URL_SEPOLIA, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
    },
  },
};

export default config;
