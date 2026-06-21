import Partner from "../models/Partner.js";
import Deal from "../models/Deal.js";
import Commission from "../models/Commission.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const getDashboard = asyncHandler(async (req, res) => {
  // total partners
  const totalPartners = await Partner.countDocuments({
    status: { $ne: "rejected" },
  });

  // total revenue (won deals)
  const wonDeals = await Deal.find({ stage: "won" });
  const totalRevenue = wonDeals.reduce((sum, d) => sum + (d.amount || 0), 0);

  // pending payouts
  const pendingCommissions = await Commission.find({ status: "pending" });
  const pendingPayouts = pendingCommissions.reduce(
    (sum, c) => sum + (c.amount || 0),
    0
  );

  // active deals
  const activeDeals = await Deal.countDocuments({
    stage: { $nin: ["won", "lost"] },
  });

  // pipeline counts
  const pipeline = {
    contacted: await Deal.countDocuments({ stage: "contacted" }),
    demo: await Deal.countDocuments({ stage: "demo" }),
    negotiating: await Deal.countDocuments({ stage: "negotiating" }),
    won: await Deal.countDocuments({ stage: "won" }),
    lost: await Deal.countDocuments({ stage: "lost" }),
  };

  res.status(200).json({
    success: true,
    data: {
      totalPartners,
      totalRevenue,
      pendingPayouts,
      activeDeals,
      pipeline,
    },
  });
});