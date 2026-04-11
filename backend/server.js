const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const creditController = require("./controllers/carbonCreditController");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ───────────────────────────────────────────────────
app.post("/api/credits", creditController.addCredit);
app.get("/api/credits/:tokenId", creditController.getCredit);
app.post("/api/credits/:tokenId/verify", creditController.verifyCredit);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "greenchain-backend", timestamp: new Date().toISOString() });
});

// ── 404 handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ── Global error handler ─────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[Server Error]", err.stack);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🌿 GreenChain Backend running on http://localhost:${PORT}`);
  console.log(`  📡 Health check: http://localhost:${PORT}/api/health\n`);
});
