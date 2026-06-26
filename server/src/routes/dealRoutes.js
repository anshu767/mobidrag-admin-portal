import express from "express";

const router = express.Router();

// Get all deals
router.get("/", async (req, res) => {
  try {
    const deals = [
      {
        _id: "1",
        brand: "Nike",
        partner: "ABC Agency",
        status: "Pending",
        commission: 5000,
      },
      {
        _id: "2",
        brand: "Adidas",
        partner: "XYZ Agency",
        status: "Approved",
        commission: 7000,
      },
    ];

    res.status(200).json({
      success: true,
      data: deals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get deal by ID
router.get("/:id", async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      _id: req.params.id,
      brand: "Nike",
      partner: "ABC Agency",
      status: "Pending",
      commission: 5000,
    },
  });
});

export default router;