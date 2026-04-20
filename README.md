# 🌿 GreenChain

**India's Farmer-First Carbon Credit Platform** — connecting 125 million smallholder farmers to the global carbon economy through AI-powered land analysis and blockchain-verified carbon credits.

> **"We use AI to measure sustainability and blockchain to make it verifiable."**

[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Polygon](https://img.shields.io/badge/Polygon-Amoy-8247E5?logo=polygon)](https://polygon.technology/)
[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](https://opensource.org/licenses/ISC)

---

## 🎯 What It Does

GreenChain is a **full-stack, end-to-end demo platform** optimized for pitch competitions, hackathons, and investor presentations:

1. **Analyzes land** — Takes a farmer's plot data (area in hectares + NDVI vegetation index) and computes a sustainability score, estimated carbon credits (CO₂e tons), and their INR value.
2. **Mints carbon credits on-chain** — Stores the verified carbon credit as an ERC-1155 NFT on the Polygon Amoy blockchain, immutably proving ownership and provenance.
3. **Provides verification** — Any credit can be independently verified against its on-chain data hash via direct Polygonscan links.

### The Pitch Flow (Component Architecture)
```text
Hero (Signature Line) → Core Engine (Live Demo) → Pipeline (How It Works) → Proof Layer (Verifiable by Design) → Value Props (Why Prana)
```

---

## 📁 Project Structure

```text
Greenchain/
├── frontend/                    # Next.js 16 (App Router) + Tailwind CSS 4
│   ├── app/
│   │   ├── page.tsx             # Root Orchestrator (Composes modular sections)
│   │   ├── globals.css          # Design system — pure CSS variables
│   │   └── components/
│   │       ├── Hero.tsx         # Animated heading with gradient text and CTA
│   │       ├── LiveDemoPreview.tsx # The 4-step E2E Demo Engine
│   │       ├── HowItWorks.tsx   # Core Pipeline visualization
│   │       ├── VerifiableByDesign.tsx # [NEW] Proof Layer anchoring AI-to-Blockchain
│   │       ├── WhyPrana.tsx, TechStack.tsx, MarketSection.tsx, AuthSection.tsx
│   │       ├── Navbar.tsx, Footer.tsx, MouseBackground.tsx, ThemeProvider.tsx
│   ├── public/logo.png
│   └── next.config.ts           # API proxy rewrites to bypass CORS
│
├── backend/                     # Express.js REST API
│   ├── server.js                # Entry point
│   ├── controllers/
│   │   ├── analyzeController.js # POST /api/analyze-land — core math engine
│   │   └── carbonCreditController.js  # CRUD for blockchain
│   ├── services/
│   │   └── blockchainService.js # ethers.js v6 — mint, verify
│   └── .env.example
│
├── blockchain/                  # Hardhat + Solidity
│   ├── contracts/
│   │   └── GreenChainCredit.sol # ERC-1155 NFT with ReentrancyGuard
│   ├── scripts/deploy.js
│   └── hardhat.config.js        # Polygon Amoy config
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4 | Modular landing page, demo UI |
| **Backend** | Express.js, ethers.js v6 | REST API, graceful fallback capabilities |
| **Smart Contract** | Solidity 0.8.28, OpenZeppelin 5.x | ERC-1155 carbon credit NFTs |
| **Blockchain** | Polygon Amoy Testnet | Low-cost, fast-finality L2 |

---

## 🚀 Getting Started

### 1. Smart Contract (one-time setup)
```bash
cd blockchain
npm install
cp .env.example .env       # Add your PRIVATE_KEY and AMOY_RPC_URL
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygon_amoy
npx hardhat run scripts/grantRole.js --network polygon_amoy # (update address inside)
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env       # Fill env variables
npm run dev                # → http://localhost:3001
```
> **Note:** The backend boots gracefully without blockchain variables — minting becomes simulated.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev                # → http://localhost:3000
```
> Forms proxy `/api/*` to `:3001` automatically.

---

## 🎨 UI & Demo Engine

### Live Demo Pipeline 
| Step | What Happens | Output |
|------|-------------|-----------------|
| **0 — Select** | Map mockup with bouncing pin | Static plot parameters |
| **1 — Analyzing** | NDVI heatmap + dynamic text changing every 900ms | Real `fetch("/api/analyze-land")` |
| **2 — Results** | Dashboard: Score, Credits, Value | Calculated dynamically + property pills |
| **3 — Mint** | Spinner → Polygon Verified ✓ | Transaction Hash + amoy.polygonscan link |

> Graceful fallback: If backend/blockchain is down, uses mock data and simulated transactions.

---

## 📡 API Reference

### Analysis Engine
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze-land` | `{ area, ndvi, crop?, region? }` $\to$ Returns Score, Credits, INR |

### Blockchain
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/credits` | `{ farmer, amount }` $\to$ Mints NFT |
| `POST` | `/api/credits/:id/verify` | `{ hash }` $\to$ Validates on-chain signature |

---

## 🏗 Built For
This project is a **demo-to-winning-product** implementation demonstrating the feasibility of a farmer-first carbon credit platform for India.
- **INR-native** — Values displayed in Indian Rupees, not USD
- **BRSR-aligned** — Compatible with India's Business Responsibility & Sustainability Reporting
- **Blockchain as proof** — Not crypto-first; blockchain is used purely for verification

---
*© 2026 GreenChain · PRANA · Phase 0 MVP · Confidential*
