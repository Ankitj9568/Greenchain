import hre from "hardhat";

async function main() {

  console.log("Deploying GreenChainCredit contract...");

  const Contract = await hre.ethers.getContractFactory("GreenChainCredit");

  const contract = await Contract.deploy(
    "https://greenchain.xyz/metadata/{id}.json"
  );

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("================================");
  console.log("GreenChainCredit deployed to:");
  console.log(address);
  console.log("================================");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
