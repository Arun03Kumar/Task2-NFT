require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_API,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
      chainId: 5
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
};
