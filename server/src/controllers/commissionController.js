import Commission from '../models/Commission.js';

/**

* GET /api/admin/payouts
  */
  export const getPayouts = async (req, res) => {
  try {
  const { status = 'pending', page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const payouts = await Commission.find(filter)
  .populate('dealId', 'brandName amount')
  .populate('partnerId', 'name email tier')
  .skip(skip)
  .limit(parseInt(limit))
  .sort({ createdAt: -1 });

  const total = await Commission.countDocuments(filter);

  const totalAmount = await Commission.aggregate([
  { $match: filter },
  { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  res.status(200).json({
  success: true,
  data: payouts,
  totalAmount: totalAmount[0]?.total || 0,
  pagination: {
  page: parseInt(page),
  limit: parseInt(limit),
  total,
  pages: Math.ceil(total / limit),
  },
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };

/**

* POST /api/admin/payouts/pay
  */
  export const markCommissionAsPaid = async (req, res) => {
  try {
  const { commissionIds, all } = req.body;

  let filter;

  if (all === true) {
  filter = { status: 'pending' };
  } else {
  if (!commissionIds || !Array.isArray(commissionIds) || commissionIds.length === 0) {
  return res.status(400).json({
  success: false,
  message: 'commissionIds array is required (or pass { all: true })',
  });
  }
  filter = { _id: { $in: commissionIds } };
  }

  const commissions = await Commission.find(filter);

  if (commissions.length === 0) {
  return res.status(404).json({
  success: false,
  message: 'No matching commissions found',
  });
  }

  const targetIds = commissions
  .filter((c) => c.status === 'pending')
  .map((c) => c._id);

  const result = await Commission.updateMany(
  { _id: { $in: targetIds } },
  { status: 'paid', paid_at: new Date() } // ✅ FIXED HERE
  );

  const updatedCommissions = await Commission.find({
  _id: { $in: targetIds },
  })
  .populate('dealId', 'brandName')
  .populate('partnerId', 'name email');

  const paidAmount = updatedCommissions.reduce((sum, c) => sum + c.amount, 0);

  res.status(200).json({
  success: true,
  message: `${result.modifiedCount} commission(s) marked as paid`,
  data: {
  count: result.modifiedCount,
  amount: paidAmount,
  commissions: updatedCommissions,
  },
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };
