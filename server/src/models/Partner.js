// server/models/Partner.js
import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  tier: {
    type: String,
    enum: ["silver", "gold", "platinum"],
    default: "silver",
  },
});

export default mongoose.model("Partner", partnerSchema);