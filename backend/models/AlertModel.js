const mongoose = require("mongoose");

const aleartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Alearts = mongoose.model("Alearts", aleartSchema);

module.exports = { Alearts };
