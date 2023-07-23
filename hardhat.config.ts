import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const { API_URL_SEPOLIA, API_URL_POLYGON_MUMBAI, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
    },
    mumbai: {
      url: API_URL_POLYGON_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

export default config;
