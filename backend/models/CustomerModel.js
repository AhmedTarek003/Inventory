const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    purchasesPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);
const Customer = mongoose.model("Customers", customerSchema);

// Validate to create a Customer
const validateCreateCustomer = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(obj);
};
// Validate to Update a Customer
const validateUpdateCustomer = (obj) => {
  const schema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    purchasesPrice: Joi.number().min(0),
  });
  return schema.validate(obj);
};

module.exports = {
  Customer,
  validateCreateCustomer,
  validateUpdateCustomer,
};
