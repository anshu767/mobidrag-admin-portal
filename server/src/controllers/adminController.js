import User from "../models/User.js";
import Deal from "../models/Deal.js";
import Commission from "../models/Commission.js";

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

    const pendingPayouts = await Commission.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      success: true,
      data: {
        totalPartners,
        totalDeals,
        wonDeals,
        revenue,
        activeDeals,
        pendingPayouts: pendingPayouts[0]?.total || 0
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};