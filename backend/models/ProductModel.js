const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImage: {
      type: Object,
      required: true,
      default: {
        url: "",
        publicId: null,
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);
const Products = mongoose.model("Products", productSchema);

// Validate to add product
const validateAddProduct = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    stock: Joi.number().required().min(0),
    price: Joi.number().required().min(0),
  });
  return schema.validate(obj);
};
// Validate to Update product
const validateUpdateProduct = (obj) => {
  const schema = Joi.object({
    name: Joi.string(),
    category: Joi.string(),
    stock: Joi.number().min(0),
    price: Joi.number().min(0),
  });
  return schema.validate(obj);
};

module.exports = { Products, validateAddProduct, validateUpdateProduct };
