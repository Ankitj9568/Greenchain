/**
 * POST /api/analyze-land
 * Body: { area: number, ndvi: number, crop?: string, region?: string }
 *
 * Core intelligence layer — computes sustainability score,
 * carbon credits, and INR value from land + vegetation data.
 */
exports.analyzeLand = (req, res) => {
  try {
    const { area, ndvi, crop, region } = req.body;

    // ── Validation ─────────────────────────────────────────
    if (area == null || ndvi == null) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: 'area' (hectares) and 'ndvi' (0-1 float)",
      });
    }

    if (typeof area !== "number" || area <= 0) {
      return res.status(400).json({
        success: false,
        error: "'area' must be a positive number (hectares)",
      });
    }

    if (typeof ndvi !== "number" || ndvi < 0 || ndvi > 1) {
      return res.status(400).json({
        success: false,
        error: "'ndvi' must be a number between 0 and 1",
      });
    }

    // ── Core Computation ───────────────────────────────────
    const score = Math.min(100, Math.round(ndvi * 120));
    const carbonCredits = Number((area * ndvi * 3).toFixed(2));
    const ratePerTon = 1200; // INR per CO₂e ton
    const valueINR = Math.round(carbonCredits * ratePerTon);

    // Vegetation classification based on NDVI ranges
    let vegetationClass;
    if (ndvi >= 0.7) vegetationClass = "Dense Vegetation";
    else if (ndvi >= 0.5) vegetationClass = "Moderate Vegetation";
    else if (ndvi >= 0.3) vegetationClass = "Sparse Vegetation";
    else vegetationClass = "Barren / Low Cover";

    // ── Response ───────────────────────────────────────────
    res.json({
      success: true,
      data: {
        score,
        carbonCredits,
        valueINR,
        vegetationClass,
        breakdown: {
          inputArea: area,
          inputNDVI: ndvi,
          crop: crop || "Unknown",
          region: region || "Unknown",
          formula: "area × NDVI × 3 = CO₂e tons",
          scoreFormula: "min(100, NDVI × 120)",
          ratePerTon,
          steps: [
            `Area: ${area} hectares`,
            `NDVI: ${ndvi} (${vegetationClass})`,
            `Score: min(100, ${ndvi} × 120) = ${score}`,
            `Credits: ${area} × ${ndvi} × 3 = ${carbonCredits} CO₂e tons`,
            `Value: ${carbonCredits} × ₹${ratePerTon} = ₹${valueINR.toLocaleString("en-IN")}`,
          ],
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[analyzeLand] Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Analysis failed. Please try again.",
    });
  }
};
