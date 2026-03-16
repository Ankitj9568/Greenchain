const { ethers } = require("ethers");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const RPC_URL = process.env.AMOY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contractAddress = "0x7990AF3Ca62A3c484B13fD7807b78aF6203eb16b";

const abi = [
  "function mintCredit(address to, uint256 tokenId, string memory creditId, bytes32 dataHash)",
  "function getCredit(uint256 tokenId) view returns (string memory creditId, bytes32 dataHash, bool retired, uint256 timestamp)",
  "function verifyCredit(uint256 tokenId, bytes32 hash) view returns (bool)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function recordCredit(farmer, amount) {
  
  const tokenId = Math.floor(Math.random() * 1000000);
  const creditId = `CREDIT_${Date.now()}`;
  const dataHash = ethers.id(creditId);
  
  const tx = await contract.mintCredit(farmer, tokenId, creditId, dataHash);
  await tx.wait();
  return tx.hash;
}

async function getCredit(tokenId) {
  return await contract.getCredit(tokenId);
}

module.exports = {
  recordCredit,
  getCredit
};