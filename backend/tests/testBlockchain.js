const blockchain = require("../services/blockchainService");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function test() {
  const farmer = "0x1234567890123456789012345678901234567890";
  const amount = 10; // CO₂e tonnes

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const walletAddress = wallet.address;

  try {
    console.log("🔗 Testing GreenChain blockchain service...\n");
    console.log(`  Wallet address : ${walletAddress}`);
    console.log(`  Farmer address : ${farmer}`);
    console.log(`  Amount (CO₂e)  : ${amount}\n`);

    console.log("⏳ Minting credit...");
    const result = await blockchain.recordCredit(farmer, amount);

    console.log("\n✅ Credit minted successfully!");
    console.log(`  Transaction Hash : ${result.txHash}`);
    console.log(`  Token ID         : ${result.tokenId}`);
    console.log(`  Credit ID        : ${result.creditId}`);

    // Verify the credit was stored correctly
    console.log("\n⏳ Fetching credit from chain...");
    const credit = await blockchain.getCredit(result.tokenId);

    console.log("\n✅ Credit retrieved:");
    console.log(`  Credit ID  : ${credit.creditId}`);
    console.log(`  Data Hash  : ${credit.dataHash}`);
    console.log(`  Retired    : ${credit.retired}`);
    console.log(`  Timestamp  : ${new Date(credit.timestamp * 1000).toISOString()}`);
  } catch (error) {
    if (error.code === "INSUFFICIENT_FUNDS") {
      console.error("\n❌ Wallet has insufficient funds for gas");
      console.error("   Fund the wallet with test POL at: https://faucet.polygon.technology/");
      console.error(`   Wallet address: ${walletAddress}`);
    } else if (error.code === "ACTION_REJECTED") {
      console.error("\n❌ Transaction rejected: Ensure the wallet has MINTER_ROLE");
    } else if (error.code === "CALL_EXCEPTION") {
      console.error("\n❌ Call reverted: The wallet may not have the required MINTER_ROLE");
      console.error("   Error:", error.shortMessage || error.message);
    } else {
      console.error("\n❌ Unexpected error:", error.message);
    }
    process.exitCode = 1;
  }
}

test();