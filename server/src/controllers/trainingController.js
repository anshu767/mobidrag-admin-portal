const TrainingModule = require("../models/TrainingModule");
const { asyncHandler } = require("../middleware/errorHandler");

// POST /api/admin/training
const createModule = asyncHandler(async (req, res) => {
  const { title, description, required, contentUrl } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "title is required" });
  }

  const module = await TrainingModule.create({ title, description, required, contentUrl });
  res.status(201).json({ success: true, data: module });
});

// GET /api/admin/training
const getModules = asyncHandler(async (req, res) => {
  const modules = await TrainingModule.find().sort({ createdAt: -1 });

  const withRates = await Promise.all(
    modules.map(async (m) => ({
      ...m.toObject(),
      completionRate: await m.completionRate(),
    }))
  );

  res.status(200).json({ success: true, data: withRates });
});

// PUT /api/admin/training/:id
const updateModule = asyncHandler(async (req, res) => {
  const module = await TrainingModule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!module) {
    return res.status(404).json({ success: false, message: "Training module not found" });
  }
  res.status(200).json({ success: true, data: module });
});

// PATCH /api/admin/training/:id/required
const toggleRequired = asyncHandler(async (req, res) => {
  const module = await TrainingModule.findById(req.params.id);
  if (!module) {
    return res.status(404).json({ success: false, message: "Training module not found" });
  }
  module.required = !module.required;
  await module.save();
  res.status(200).json({ success: true, data: module });
});

// POST /api/admin/training/:id/complete
// Body: { partnerId }
const markComplete = asyncHandler(async (req, res) => {
  const { partnerId } = req.body;
  if (!partnerId) {
    return res.status(400).json({ success: false, message: "partnerId is required" });
  }

  const module = await TrainingModule.findById(req.params.id);
  if (!module) {
    return res.status(404).json({ success: false, message: "Training module not found" });
  }

  const already = module.completions.some((c) => String(c.partnerId) === String(partnerId));
  if (!already) {
    module.completions.push({ partnerId });
    await module.save();
  }

  res.status(200).json({ success: true, data: module });
});

// DELETE /api/admin/training/:id
const deleteModule = asyncHandler(async (req, res) => {
  const module = await TrainingModule.findByIdAndDelete(req.params.id);
  if (!module) {
    return res.status(404).json({ success: false, message: "Training module not found" });
  }
  res.status(200).json({ success: true, message: "Training module deleted" });
});

module.exports = { createModule, getModules, updateModule, toggleRequired, markComplete, deleteModule };