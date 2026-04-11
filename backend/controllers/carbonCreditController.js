const blockchain = require("../services/blockchainService");

/**
 * POST /api/credits
 * Body: { farmer: "0x...", amount: 10 }
 * Mints a new carbon credit NFT to the farmer's address.
 */
exports.addCredit = async (req, res) => {
  try {
    const { farmer, amount } = req.body;

    if (!farmer || !amount) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: 'farmer' (address) and 'amount' (CO₂e tonnes)",
      });
    }

    const result = await blockchain.recordCredit(farmer, amount);

    res.status(201).json({
      success: true,
      data: {
        transactionHash: result.txHash,
        tokenId: result.tokenId,
        creditId: result.creditId,
      },
    });
  } catch (error) {
    console.error("[addCredit] Error:", error.message);

    // Map known blockchain errors to user-friendly messages
    if (error.code === "INSUFFICIENT_FUNDS") {
      return res.status(503).json({
        success: false,
        error: "Backend wallet has insufficient funds for gas. Please contact admin.",
      });
    }
    if (error.code === "CALL_EXCEPTION") {
      return res.status(409).json({
        success: false,
        error: "Transaction reverted: " + (error.shortMessage || error.message),
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to mint credit. Please try again later.",
    });
  }
};

/**
 * GET /api/credits/:tokenId
 * Retrieves credit details from the blockchain.
 */
exports.getCredit = async (req, res) => {
  try {
    const { tokenId } = req.params;

    if (!tokenId) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameter: tokenId",
      });
    }

    const credit = await blockchain.getCredit(tokenId);

    res.json({
      success: true,
      data: credit,
    });
  } catch (error) {
    console.error("[getCredit] Error:", error.message);

    if (error.message.includes("Credit not found")) {
      return res.status(404).json({
        success: false,
        error: "Credit not found for the given tokenId",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to retrieve credit",
    });
  }
};

/**
 * POST /api/credits/:tokenId/verify
 * Body: { hash: "0x..." }
 * Verifies a credit's data integrity on-chain.
 */
exports.verifyCredit = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { hash } = req.body;

    if (!tokenId || !hash) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: tokenId (param) and hash (body)",
      });
    }

    const isValid = await blockchain.verifyCredit(tokenId, hash);

    res.json({
      success: true,
      data: { tokenId, verified: isValid },
    });
  } catch (error) {
    console.error("[verifyCredit] Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to verify credit",
    });
  }
};