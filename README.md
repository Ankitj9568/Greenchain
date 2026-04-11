# 🌿 GreenChain

**India's Farmer-First Carbon Credit Platform** — connecting 125 million smallholder farmers to the global carbon economy.

> INR First • Farmer First • Blockchain as Proof Only

## Project Structure

```
Greenchain/
├── frontend/           # Next.js + Tailwind CSS — landing page & UI
├── blockchain/         # Hardhat + Solidity — ERC-1155 carbon credit NFT
│   ├── contracts/      # GreenChainCredit.sol
│   └── scripts/        # deploy.js, grantRole.js
├── backend/            # Express.js API — blockchain service layer
│   ├── controllers/    # REST endpoint handlers
│   ├── services/       # Blockchain interaction (ethers.js)
│   └── tests/          # Integration tests
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Blockchain (Smart Contracts)

```bash
cd blockchain
npm install
npx hardhat compile
```

To deploy to Polygon Amoy testnet:
```bash
cp .env.example .env   # Fill in your PRIVATE_KEY
npx hardhat run scripts/deploy.js --network polygon_amoy
```

### 2. Backend (API Server)

```bash
cd backend
npm install
cp .env.example .env   # Fill in PRIVATE_KEY, CONTRACT_ADDRESS
npm run dev            # Starts on http://localhost:3001
```

**API Endpoints:**
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/credits` | Mint a new carbon credit |
| `GET` | `/api/credits/:tokenId` | Get credit details |
| `POST` | `/api/credits/:tokenId/verify` | Verify credit hash |
| `GET` | `/api/health` | Health check |

### 3. Frontend

```bash
cd frontend
npm install
npm run dev            # Starts on http://localhost:3000
```

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Backend | Express.js, ethers.js v6 |
| Blockchain | Solidity 0.8.28, Hardhat, OpenZeppelin (ERC-1155, AccessControl) |
| Network | Polygon Amoy Testnet |

## License

ISC
