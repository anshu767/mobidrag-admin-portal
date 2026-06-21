import User from "../models/User.js";
import Deal from "../models/Deal.js";
import Commission from "../models/Commission.js";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const getDashboard = async (req, res) => {
  try {
    const totalPartners = await User.countDocuments({ role: "partner" });

    const deals = await Deal.find();

    const totalDeals = deals.length;

    const wonDeals = deals.filter(d => d.stage === "won").length;

    const revenue = deals
      .filter(d => d.stage === "won")
      .reduce((sum, d) => sum + d.amount, 0);

    const activeDeals = deals.filter(
      d => d.stage !== "won" && d.stage !== "lost"
    ).length;

    // "Stalled" = active deal with no stage update in 7+ days (spec 2.1)
    const now = Date.now();
    const stalledDeals = deals.filter(
      d =>
        d.stage !== "won" &&
        d.stage !== "lost" &&
        now - new Date(d.updatedAt).getTime() > SEVEN_DAYS_MS
    ).length;

    const pendingPayouts = await Commission.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Pipeline overview counts (spec 2.1) — used by the dashboard's stage boxes
    const pipeline = {
      contacted: deals.filter(d => d.stage === "contacted").length,
      demo: deals.filter(d => d.stage === "demo").length,
      negotiating: deals.filter(d => d.stage === "negotiating").length,
      won: wonDeals,
      lost: deals.filter(d => d.stage === "lost").length,
    };

    res.json({
      success: true,
      data: {
        totalPartners,
        totalDeals,
        wonDeals,
        revenue,
        activeDeals,
        stalledDeals,
        pendingPayouts: pendingPayouts[0]?.total || 0,
        pipeline,
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};