const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

// Validation to create a new user
const validateCreateUser = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(obj);
};
// Validation when user logged in
const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(obj);
};
// Validation when user Update
const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    oldpassword: Joi.string(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validateCreateUser,
  validateLoginUser,
  validateUpdateUser,
};
