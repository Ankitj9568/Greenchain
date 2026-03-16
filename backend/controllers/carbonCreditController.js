const blockchain = require("../services/blockchainService");

exports.addCredit = async (req, res) => {
  const { farmer, amount } = req.body;

  const txHash = await blockchain.recordCredit(farmer, amount);

  res.json({
    success: true,
    transaction: txHash
  });
};