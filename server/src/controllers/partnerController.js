/**
 * Partners Controller
 * Manage partner information, tier, and status
 */

import User from '../models/User.js';

/**
 * GET /api/admin/partners
 * Fetch all partners (excluding admins)
 */
export const getPartners = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;

    // Build filter - only partners
    const filter = { role: 'partner' };

    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const partners = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: partners,
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
 * PATCH /api/admin/partners/:id
 * Update partner tier and/or status
 * Body: { tier: 'silver'|'gold'|'platinum', status: 'active'|'suspended' }
 */
export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { tier, status } = req.body;

    // Validate tier
    if (tier && !['silver', 'gold', 'platinum'].includes(tier)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tier. Must be silver, gold, or platinum',
      });
    }

    // Validate status
    if (status && !['active', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be active or suspended',
      });
    }

    // Build update object
    const updateData = {};
    if (tier) updateData.tier = tier;
    if (status) updateData.status = status;

    const partner = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    if (partner.role !== 'partner') {
      return res.status(400).json({
        success: false,
        message: 'User is not a partner',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner updated successfully',
      data: partner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default { getPartners, updatePartner };
