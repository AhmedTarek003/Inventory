const { check } = require("express-validator");
const validator = require("../middlewares/validator");

exports.createPhoneNumberValidator = [
  check("phone")
    .notEmpty()
    .withMessage("phone number is required")
    .isMobilePhone()
    .withMessage("invalid phone number"),
  validator,
];
exports.updatePhoneNumberValidator = [
  check("phone").optional().isMobilePhone().withMessage("invalid phone number"),
  validator,
];
