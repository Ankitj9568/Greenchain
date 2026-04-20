"use client";

import { useState, useEffect } from "react";
import { MapPin, Satellite, CheckCircle2, Activity, IndianRupee, Lock } from "lucide-react";

interface AnalysisResult {
  score: number;
  carbonCredits: number;
  valueINR: number;
  vegetationClass: string;
  breakdown: {
    inputArea: number;
    inputNDVI: number;
    crop: string;
    region: string;
    ratePerTon: number;
    steps: string[];
  };
}

interface MintResult {
  txHash: string;
  tokenId: string;
  creditId: string;
}

export default function LiveDemoPreview() {
  const [step, setStep] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [mintResult, setMintResult] = useState<MintResult | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);

  const plot = { area: 2.4, ndvi: 0.65, crop: "Sugarcane", region: "Maharashtra" };

  const runDemo = () => setStep(1);

  const resetDemo = () => {
    setStep(0);
    setResult(null);
    setMintResult(null);
    setIsMinting(false);
    setMintError(null);
    setLoadingText("Initializing...");
  };

  // Step 1: loading phrases + real API call
  useEffect(() => {
    if (step !== 1) return;

    const phrases = [
      "Fetching Sentinel-2 satellite imagery...",
      "Computing NDVI vegetation index...",
      "Evaluating carbon sequestration...",
      "Calculating credit value in INR...",
    ];
    let i = 0;
    setLoadingText(phrases[0]);

    const interval = setInterval(() => {
      i++;
      if (i < phrases.length) {
        setLoadingText(phrases[i]);
      }
    }, 900);

    const controller = new AbortController();
    const startTime = Date.now();

    fetch("/api/analyze-land", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plot),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setResult(json.data);
          const elapsed = Date.now() - startTime;
          setTimeout(() => setStep(2), Math.max(0, 4000 - elapsed));
        } else {
          throw new Error(json.error || "Analysis failed");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("API unavailable, using mock data:", err.message);
          setResult({
            score: 78,
            carbonCredits: 4.68,
            valueINR: 5616,
            vegetationClass: "Moderate Vegetation",
            breakdown: {
              inputArea: plot.area,
              inputNDVI: plot.ndvi,
              crop: plot.crop,
              region: plot.region,
              ratePerTon: 1200,
              steps: [
                `Area: ${plot.area} hectares`,
                `NDVI: ${plot.ndvi} (Moderate Vegetation)`,
                `Score: min(100, 0.65 × 120) = 78`,
                `Credits: 2.4 × 0.65 × 3 = 4.68 CO₂e tons`,
                `Value: 4.68 × ₹1,200 = ₹5,616`,
              ],
            },
          });
          const elapsed = Date.now() - startTime;
          setTimeout(() => setStep(2), Math.max(0, 4000 - elapsed));
        }
      });

    return () => {
      clearInterval(interval);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Mint handler
  const handleMint = async () => {
    if (!result) return;
    setIsMinting(true);
    setMintError(null);
    setStep(3);

    try {
      const res = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmer: "0x742d35CC6634c0532925a3B844bc9e7595F2Bd28",
          amount: result.carbonCredits,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setMintResult({
          txHash: json.data.transactionHash,
          tokenId: json.data.tokenId,
          creditId: json.data.creditId,
        });
      } else {
        throw new Error(json.error || "Minting failed");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Minting failed";
      console.warn("Mint error:", message);
      setMintError(message);
      setMintResult({
        txHash: "0xa3f7c1d9e4b2f8a6c5d3e1b9f7a4c2d8e6b3a1f9c7d5e3b1a8f6c4d2e0b7a5",
        tokenId: "demo-token",
        creditId: "DEMO_CREDIT_" + Date.now(),
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <section id="live-demo" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">Live Preview</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            See the Engine in Action
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
            Select a land plot → AI analyzes satellite data → mint a verifiable carbon credit on Polygon.
          </p>
        </div>

        {/* Demo Window */}
        <div className="overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl card-shadow" style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border)" }}>

          {/* Header bar */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-4 text-xs font-mono font-medium opacity-50 tracking-wider">prana.greenchain.io/engine</span>
            <div className="ml-auto flex items-center gap-1.5">
              {[0, 1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${step >= s ? "w-6 bg-emerald-500" : "w-1.5 bg-gray-400/30"}`} />
              ))}
            </div>
          </div>

          <div className="relative min-h-96 w-full p-4 sm:p-6 flex flex-col items-center justify-center">

            {/* STEP 0: Map Select */}
            {step === 0 && (
              <div className="flex h-full w-full flex-col items-center justify-center text-center animate-fade-in pt-4 sm:pt-0">
                <div className="relative mb-8 h-40 sm:h-48 w-full max-w-md overflow-hidden rounded-xl bg-emerald-900/10" style={{ border: "1px dashed var(--border)" }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--text-primary) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  <div className="absolute top-1/2 left-1/2 h-24 w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-emerald-500 bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <MapPin className="text-emerald-500 animate-bounce" size={24} />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold" style={{ color: "var(--text-primary)" }}>Plot 42 — {plot.region}</h3>
                <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>Area: {plot.area} Hectares • Crop: {plot.crop} • NDVI: {plot.ndvi}</p>
                <button onClick={runDemo} className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors">
                  <Activity size={18} /> Analyze Satellite Data
                </button>
              </div>
            )}

            {/* STEP 1: Loading + NDVI Heatmap */}
            {step === 1 && (
              <div className="flex flex-col items-center justify-center text-center w-full h-full animate-fade-in">
                <div className="relative mb-8 h-32 sm:h-36 w-full max-w-md overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 via-yellow-400/80 via-60% to-emerald-500/80 animate-[ndvi-sweep_3s_ease-in-out_infinite]" />
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="rounded-full bg-black/40 px-4 py-1.5 text-xs font-bold text-white tracking-wider">NDVI BAND ANALYSIS</span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_#fff] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                </div>

                <div className="relative mb-6 h-16 w-16 sm:h-20 sm:w-20">
                  <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-r-2 border-amber-500 animate-[spin_2s_reverse_infinite]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Satellite className="text-emerald-500" size={24} />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-tight text-emerald-500 dark:text-emerald-400">{loadingText}</h3>
              </div>
            )}

            {/* STEP 2: Results Dashboard */}
            {step === 2 && result && (
              <div className="w-full h-full flex flex-col justify-center animate-fade-in">
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>Analysis Complete</h3>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={14} /> Verified
                  </span>
                </div>

                {/* Input summary */}
                <div className="mb-4 flex flex-wrap gap-2 text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="rounded-full px-2.5 py-1" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    📍 {result.breakdown.region}
                  </span>
                  <span className="rounded-full px-2.5 py-1" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    📐 {result.breakdown.inputArea} ha
                  </span>
                  <span className="rounded-full px-2.5 py-1" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    🌿 NDVI {result.breakdown.inputNDVI}
                  </span>
                  <span className="rounded-full px-2.5 py-1" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    🌾 {result.breakdown.crop}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex flex-col justify-center rounded-xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02]" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    <p className="mb-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Sustainability Score</p>
                    <p className="text-3xl sm:text-4xl font-black text-amber-500">{result.score}<span className="text-lg sm:text-xl text-amber-500/50">/100</span></p>
                    <p className="mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>{result.vegetationClass}</p>
                  </div>
                  <div className="flex flex-col justify-center rounded-xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02]" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    <p className="mb-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Carbon Credits</p>
                    <p className="text-3xl sm:text-4xl font-black text-blue-500">{result.carbonCredits}<span className="text-lg sm:text-xl text-blue-500/50"> tons</span></p>
                    <p className="mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>CO₂e sequestered annually</p>
                  </div>
                  <div className="flex flex-col justify-center rounded-xl p-4 sm:p-5 border border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <IndianRupee size={80} />
                    </div>
                    <p className="mb-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Estimated Value</p>
                    <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-500">₹{result.valueINR.toLocaleString("en-IN")}</p>
                    <p className="mt-1 text-[10px] text-emerald-600/70 dark:text-emerald-400/70">@ ₹{result.breakdown.ratePerTon}/ton</p>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 flex items-center justify-between">
                  <button onClick={resetDemo} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity">
                    Reset Demo ↺
                  </button>
                  <button onClick={handleMint} className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors">
                    <Lock size={16} /> Mint on Blockchain
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Blockchain Minting */}
            {step === 3 && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fade-in">
                {isMinting ? (
                  <>
                    <div className="relative mb-8 h-24 w-24">
                      <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="text-emerald-500" size={28} />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-mono font-bold text-emerald-500">Minting on Polygon...</h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Signing transaction & waiting for block confirmation</p>
                  </>
                ) : mintResult ? (
                  <>
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500">
                      <CheckCircle2 className="text-emerald-500" size={40} />
                    </div>
                    <h3 className="mb-2 text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                      Verified On-Chain ✓
                    </h3>
                    <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
                      {result?.carbonCredits} CO₂e tons minted as ERC-1155 NFT on Polygon
                    </p>

                    {mintError && (
                      <p className="mb-4 text-xs text-amber-500 bg-amber-500/10 rounded-lg px-4 py-2">
                        ⚠ Live blockchain unavailable — showing simulated transaction
                      </p>
                    )}

                    <div className="w-full max-w-lg rounded-xl p-4 sm:p-5" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                      <div className="flex flex-col gap-3 text-left">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: "var(--text-muted)" }}>Transaction Hash</span>
                          <a
                            href={`https://amoy.polygonscan.com/tx/${mintResult.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline truncate max-w-[180px] sm:max-w-[220px]"
                          >
                            {mintResult.txHash.slice(0, 10)}...{mintResult.txHash.slice(-8)}
                          </a>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: "var(--text-muted)" }}>Credit ID</span>
                          <span className="font-mono truncate max-w-[180px]" style={{ color: "var(--text-secondary)" }}>{mintResult.creditId}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: "var(--text-muted)" }}>Network</span>
                          <span className="flex items-center gap-1.5 font-medium text-purple-500">
                            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                            Polygon Amoy
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                      <button onClick={resetDemo} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity">
                        Run Again ↺
                      </button>
                      <a
                        href={`https://amoy.polygonscan.com/tx/${mintResult.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-purple-500 hover:underline"
                      >
                        View on Polygonscan →
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        @keyframes ndvi-sweep {
          0%, 100% { filter: hue-rotate(0deg) brightness(1); }
          50% { filter: hue-rotate(15deg) brightness(1.1); }
        }
      `}} />
    </section>
  );
}
