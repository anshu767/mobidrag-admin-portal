/**
 * Deals Controller
 * IMPORTANT LOGIC:
 * - When stage = "won" → auto create commission (only once)
 * - When stage = "lost" → store loss reason
 */

import Deal from '../models/Deal.js';
import Commission from '../models/Commission.js';

/**
 * GET /api/admin/deals
 */
export const getDeals = async (req, res) => {
  try {
    const { stage, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const filter = {};
    if (stage) filter.stage = stage;

    const skip = (page - 1) * limit;

    const deals = await Deal.find(filter)
      .populate('partnerId', 'name email tier')
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sort);

    const total = await Deal.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: deals,
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
 * PATCH /api/admin/deals/:id/stage
 */
export const updateDealStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, lossReason } = req.body;

    // ✅ Validate stage
    const validStages = ['contacted', 'demo', 'negotiating', 'won', 'lost'];
    if (!validStages.includes(stage)) {
      return res.status(400).json({
        success: false,
        message: `Invalid stage. Must be one of: ${validStages.join(', ')}`,
      });
    }

    // ✅ Validate loss reason
    if (stage === 'lost' && !lossReason) {
      return res.status(400).json({
        success: false,
        message: 'lossReason is required when marking deal as lost',
      });
    }

    // ✅ Get deal
    const deal = await Deal.findById(id).populate('partnerId', 'name email');

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found',
      });
    }

    // ✅ Update deal
    const updateData = { stage };

    if (stage === 'lost') {
      updateData.lossReason = lossReason;
    }

    const updatedDeal = await Deal.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('partnerId', 'name email tier');

    // 🔥 IMPORTANT: handle commission only once
    if (stage === 'won') {

      const existing = await Commission.findOne({ dealId: id });

      // 👉 create only if not exists
      if (!existing) {
        const commissionAmount = deal.amount * 0.1;

        const commission = await Commission.create({
          dealId: id,
          partnerId: deal.partnerId._id,
          amount: commissionAmount,
          status: 'pending',
        });

        return res.status(200).json({
          success: true,
          message: 'Deal marked as won & commission created',
          data: {
            deal: updatedDeal,
            commission,
          },
        });
      }

      // 👉 already exists
      return res.status(200).json({
        success: true,
        message: 'Deal already marked as won (commission exists)',
        data: updatedDeal,
      });
    }

    // ✅ Normal response
    res.status(200).json({
      success: true,
      message: 'Deal stage updated successfully',
      data: updatedDeal,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default { getDeals, updateDealStage };