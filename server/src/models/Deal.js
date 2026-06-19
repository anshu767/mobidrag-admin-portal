/**
 * Deal Model
 * Tracks brand partnerships and deal stages
 * Fields: brandName, partnerId, stage, amount, createdAt, updatedAt
 */

import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stage: {
      type: String,
      enum: ['contacted', 'demo', 'negotiating', 'won', 'lost'],
      default: 'contacted',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    lossReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Deal', dealSchema);
