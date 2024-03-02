const asyncHandler = require("express-async-handler");
const { Alearts } = require("../models/AlertModel");

/**
 * @desc get all alerts
 * @route /api/alerts
 * @method GET
 * @access private (only users)
 */
exports.getAllAlertsCtrl = asyncHandler(async (req, res) => {
  const alerts = await Alearts.find().sort("-createdAt");
  res.status(200).json(alerts);
});
/**
 * @desc get alert by id
 * @route /api/alerts/:id
 * @method GET
 * @access private (only users)
 */
exports.getAlertById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const alert = await Alearts.findById(id);
  if (!alert) {
    return res.status(404).json({ msg: "alert not found" });
  }
  res.status(200).json(alert);
});
/**
 * @desc update alert by id
 * @route /api/alerts/:id
 * @method PUT
 * @access private (only users)
 */
exports.updateAlert = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const alert = await Alearts.findById(id);
  if (!alert) {
    return res.status(404).json({ msg: "alert not found" });
  }
  await Alearts.findByIdAndUpdate(
    id,
    {
      $set: {
        show: true,
      },
    },
    { new: true }
  );
});
