const blockchain = require("../services/blockchainService");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function test() {

  const farmer = "0x1234567890123456789012345678901234567890";
  const amount = 10;

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const walletAddress = wallet.address;

  try {
    console.log("Testing blockchain service...");
    console.log(`Wallet address: ${walletAddress}`);
    console.log(`Attempting to record credit for farmer: ${farmer}, amount: ${amount}`);
    
    const tx = await blockchain.recordCredit(farmer, amount);
    
    console.log("Transaction Hash:", tx);
  } catch (error) {
    if (error.code === 'INSUFFICIENT_FUNDS') {
      console.log("Error: Wallet has insufficient funds for gas");
      console.log("To test on Polygon Amoy, fund the wallet with test MATIC:");
      console.log("https://faucet.polygon.technology/");
      console.log("Wallet address:", walletAddress);
    } else if (error.code === 'ACTION_REJECTED') {
      console.log("Transaction rejected: Ensure the wallet has MINTER_ROLE");
    } else if (error.code === 'CALL_EXCEPTION') {
      console.log("Call reverted: The wallet does not have the required MINTER_ROLE for this contract");
      console.log("Error:", error.shortMessage || error.message);
    } else {
      console.log("Error:", error.message);
    }
  }

}

test();