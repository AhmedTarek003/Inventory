const mongoose = require("mongoose");

const validateObjId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "invalid id" });
  }
  next();
};

module.exports = validateObjId;
