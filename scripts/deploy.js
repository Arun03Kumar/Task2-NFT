const hre = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("verifying contract...")
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } 
  catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("contract is alredy verified");
    } else {
      console.log(e);
    }
  }
}


const main = async () => {

  const Task2NFT = await hre.ethers.getContractFactory("Task2Nft");
  const task2NFT = await Task2NFT.deploy();

  await task2NFT.deployed();

  if(hre.network.config.chainId === 5 && process.env.ETHERSCAN_API != undefined) {
    await task2NFT.deployTransaction.wait(3)
    await verify(task2NFT.address, [])
  }

   console.log(`verified and deployed to ${task2NFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


