const hre = require("hardhat")
const { ethers } = require("ethers")
const contractJson = require("../artifacts/contracts/Task2NFT.sol/Task2Nft.json")
require("dotenv").config()

const contractAddress = "0xcD0F864FcD3303028d70a7B43E33EB1026ca023e";
// 0xcd0f864fcd3303028d70a7b43e33eb1026ca023e;

const main = async (tokenURI) => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.ALCHEMY_GOERLI_API
    );
    const wallet = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, provider)
    const contract = new ethers.Contract(contractAddress, contractJson.abi, wallet);
    const mintToken = await contract.mint(
      process.env.METAMASK_PUBLIC_KEY, tokenURI
    );
    // const mintToken = await contract.mint(
    //   process.env.METAMASK_PUBLIC_KEY,
    //   "https://gateway.pinata.cloud/ipfs/QmPJ1MwwjZBkXwzfxNtr7VWPqRw8DcBp4TfGgB6ibE95eP"
    // );
    // console.log(`tx hash: ${mintToken.hash}`)
    return mintToken.hash
}

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

module.exports = main



