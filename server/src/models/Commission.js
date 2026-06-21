import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
    },
    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },
    amount: Number,
    rate: Number,
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paid_at: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Commission", commissionSchema);