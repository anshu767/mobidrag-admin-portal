/**
 * Application Model
 * Stores partner applications for admin review and approval
 * Fields: name, email, status, createdAt, updatedAt
 */

import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
