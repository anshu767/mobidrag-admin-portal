import Deal from "../models/Deal.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import Commission from "../models/Commission.js";

// POST
export const createDeal = async (req, res) => {
  try {
    const deal = await Deal.create(req.body);
    res.json({ success: true, data: deal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all
export const getDeals = asyncHandler(async (req, res) => {
  const deals = await Deal.find().populate("partnerId", "name company").sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: deals });
});

// GET one
export const getDeal = asyncHandler(async (req, res) => {
  const deal = await Deal.findById(req.params.id).populate("partnerId", "name company");
  if (!deal) {
    return res.status(404).json({ success: false, message: "Deal not found" });
  }
  res.status(200).json({ success: true, data: deal });
});

// PATCH
export const updateDealStage = asyncHandler(async (req, res) => {
  const { stage, lossReason } = req.body;

  const deal = await Deal.findById(req.params.id);

  if (!deal) {
    return res.status(404).json({
      success: false,
      message: "Deal not found",
    });
  }

  // update stage
  deal.stage = stage;
  deal.lastActivityAt = Date.now();

  // अगर LOST
  if (stage === "lost") {
    deal.lossReason = lossReason || "";
  }

  // अगर WON → commission create
  if (stage === "won") {
    // check already created or not
    const existing = await Commission.findOne({ dealId: deal._id });

    if (!existing) {
      const rate = 0.1; // 10% (later dynamic kar sakte ho)

      const amount = (deal.amount || 0) * rate;

      await Commission.create({
        partnerId: deal.partnerId,
        dealId: deal._id,
        amount,
        rate,
        status: "pending",
      });
    }
  }

  await deal.save();

  res.status(200).json({
    success: true,
    data: deal,
  });
});

// PUT
export const updateDeal = asyncHandler(async (req, res) => {
  req.body.lastActivityAt = Date.now();

  const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!deal) {
    return res.status(404).json({ success: false, message: "Deal not found" });
  }

  res.status(200).json({ success: true, data: deal });
});

// DELETE
export const deleteDeal = asyncHandler(async (req, res) => {
  const deal = await Deal.findByIdAndDelete(req.params.id);

  if (!deal) {
    return res.status(404).json({ success: false, message: "Deal not found" });
  }

  res.status(200).json({ success: true, message: "Deal deleted" });
});