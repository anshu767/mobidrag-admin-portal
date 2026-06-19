/**
 * Applications Controller
 * Handle partner applications: approve (creates partner), reject
 */

import Application from '../models/Application.js';
import User from '../models/User.js';

/**
 * GET /api/admin/applications
 * Fetch all applications (pending only by default)
 */
export const getApplications = async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: applications,
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
 * POST /api/admin/applications/:id/approve
 * Approve application → Create partner account with default password
 */
export const approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot approve ${application.status} application`,
      });
    }

    // Check if partner already exists
    const existingUser = await User.findOne({ email: application.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Partner already exists with this email',
      });
    }

    // Create partner user
    const partner = await User.create({
      name: application.name,
      email: application.email,
      password: 'ChangeMe@123', // Default password - must change on first login
      role: 'partner',
      tier: 'silver',
      status: 'active',
    });

    // Update application status
    await Application.findByIdAndUpdate(id, { status: 'approved' });

    res.status(201).json({
      success: true,
      message: 'Application approved & partner account created',
      data: {
        partnerId: partner._id,
        name: partner.name,
        email: partner.email,
        tier: partner.tier,
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
 * POST /api/admin/applications/:id/reject
 * Reject application
 */
export const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default { getApplications, approveApplication, rejectApplication };
