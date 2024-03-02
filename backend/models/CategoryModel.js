const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categorySchema);

// Validate to create a Category
const validateCreateCategory = (obj) => {
  const schema = Joi.object({
    category: Joi.string().required(),
  });
  return schema.validate(obj);
};
// Validate to Update a Category
const validateUpdateCategory = (obj) => {
  const schema = Joi.object({
    category: Joi.string(),
  });
  return schema.validate(obj);
};

module.exports = { Categories, validateCreateCategory, validateUpdateCategory };
