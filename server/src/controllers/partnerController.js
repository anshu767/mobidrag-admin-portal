import Partner from "../models/Partner.js";
import Deal from "../models/Deal.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// CREATE partner
export const createPartner = async (req, res) => {
  try {
    const { name, email, tier } = req.body;

    const partner = await Partner.create({
      name,
      email,
      tier: tier || "gold",
    });

    // 🔥 IMPORTANT: same structure jo getPartners me hai
    const enriched = {
      ...partner.toObject(),
      dealsCount: 0,
      revenue: 0,
    };

    res.status(201).json({
      success: true,
      data: enriched,
      message: "Partner created successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// GET all partners
export const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find().sort({ createdAt: -1 });

  const enriched = await Promise.all(
    partners.map(async (p) => {
      const deals = await Deal.find({ partnerId: p._id });

      const revenue = deals
        .filter((d) => d.stage === "won")
        .reduce((sum, d) => sum + d.amount, 0);

      return {
        ...p.toObject(),
        dealsCount: deals.length,
        revenue,
      };
    })
  );

  res.status(200).json({ success: true, data: enriched });
});

// GET single partner
export const getPartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      message: "Partner not found",
    });
  }

  res.status(200).json({ success: true, data: partner });
});

// UPDATE partner
export const updatePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!partner) {
    return res.status(404).json({
      success: false,
      message: "Partner not found",
    });
  }

  res.status(200).json({ success: true, data: partner });
});

// DELETE partner
export const deletePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findByIdAndDelete(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      message: "Partner not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Partner deleted",
  });
});