const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ result: result.array() });
  }
  next();
};

module.exports = validator;
