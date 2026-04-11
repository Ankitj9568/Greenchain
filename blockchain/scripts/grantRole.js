import hre from "hardhat";

async function main() {

  const contractAddress = "0x7990AF3Ca62A3c484B13fD7807b78aF6203eb16b";

  const GreenChainCredit = await hre.ethers.getContractFactory("GreenChainCredit");
  const contract = GreenChainCredit.attach(contractAddress);

  const backendWallet = "0x54EcAdbD6a16E602361a8e2657896A3bAFE0BfbD";

  const tx = await contract.grantMinterRole(backendWallet);

  await tx.wait();

  console.log("MINTER_ROLE granted to:", backendWallet);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});