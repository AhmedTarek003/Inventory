const mongoose = require("mongoose");
const Joi = require("joi");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Supplier = mongoose.model("Supplier", supplierSchema);

// Validate to create a supplier
const validateCreateSupplier = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(obj);
};
// Validate to Update a supplier
const validateUpdateSupplier = (obj) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });
  return schema.validate(obj);
};

module.exports = { Supplier, validateCreateSupplier, validateUpdateSupplier };
