const { ethers } = require("ethers");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ── Config from environment ──────────────────────────────────
const RPC_URL = process.env.AMOY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

let provider = null;
let wallet = null;
let contract = null;
let isConfigured = false;

const abi = [
  "function mintCredit(address to, uint256 tokenId, string memory creditId, bytes32 dataHash)",
  "function getCredit(uint256 tokenId) view returns (string memory creditId, bytes32 dataHash, bool retired, uint256 timestamp)",
  "function verifyCredit(uint256 tokenId, bytes32 hash) view returns (bool)",
  "function retireCredit(uint256 tokenId)",
  "function balanceOf(address account, uint256 id) view returns (uint256)"
];

try {
  if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error("Missing env vars: AMOY_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS");
  }
  provider = new ethers.JsonRpcProvider(RPC_URL);
  wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
  isConfigured = true;
  console.log("  ✅ Blockchain service configured successfully");
} catch (err) {
  console.warn(`  ⚠️  Blockchain not configured: ${err.message}`);
  console.warn("  ⚠️  Analyze API will work, but minting is disabled.");
}

/**
 * Generate a collision-resistant tokenId using keccak256 hash
 * of creditId, truncated to a uint256-safe integer.
 */
function generateTokenId(creditId) {
  const hash = ethers.id(creditId);
  // Take first 8 bytes of hash for a large-enough numeric ID
  return BigInt(hash.slice(0, 18));
}

/**
 * Mint a new carbon credit NFT to a farmer's address.
 * @param {string} farmerAddress - Ethereum address of the farmer
 * @param {number} amount - CO₂e tonnes (stored in dataHash for on-chain proof)
 * @returns {Object} - { txHash, tokenId, creditId }
 */
async function recordCredit(farmerAddress, amount) {
  if (!isConfigured) {
    throw new Error("Blockchain not configured. Set AMOY_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS in .env");
  }
  if (!ethers.isAddress(farmerAddress)) {
    throw new Error(`Invalid farmer address: ${farmerAddress}`);
  }
  if (!amount || amount <= 0) {
    throw new Error("Amount must be a positive number representing CO₂e tonnes");
  }

  const creditId = `CREDIT_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const tokenId = generateTokenId(creditId);

  // Include amount in dataHash so it's provable on-chain
  const dataPayload = JSON.stringify({ creditId, amount, farmer: farmerAddress });
  const dataHash = ethers.id(dataPayload);

  const tx = await contract.mintCredit(farmerAddress, tokenId, creditId, dataHash);
  const receipt = await tx.wait();

  return {
    txHash: receipt.hash,
    tokenId: tokenId.toString(),
    creditId,
  };
}

/**
 * Retrieve credit details from the blockchain.
 * @param {string|number} tokenId - The token ID to query
 * @returns {Object} - { creditId, dataHash, retired, timestamp }
 */
async function getCredit(tokenId) {
  const [creditId, dataHash, retired, timestamp] = await contract.getCredit(tokenId);
  return {
    creditId,
    dataHash,
    retired,
    timestamp: Number(timestamp),
  };
}

/**
 * Verify a credit's data integrity on-chain.
 * @param {string|number} tokenId - The token ID to verify
 * @param {string} hash - The expected data hash
 * @returns {boolean}
 */
async function verifyCredit(tokenId, hash) {
  return await contract.verifyCredit(tokenId, hash);
}

module.exports = {
  recordCredit,
  getCredit,
  verifyCredit,
  isConfigured,
};