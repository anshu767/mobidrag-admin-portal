/**
 * Commission Model
 * Tracks commission payments to partners
 * Fields: dealId, partnerId, amount, status, createdAt, updatedAt
 */

import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema(
  {
    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
      required: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Commission', commissionSchema);
