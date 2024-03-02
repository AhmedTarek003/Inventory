const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validateCreateUser,
  validateLoginUser,
} = require("../models/UserModel");

/**
 * @desc create a new user
 * @route /api/auth/signup
 * @method POST
 * @access public
 */
exports.signUpUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // Check if user already exists
  const emailUser = await User.findOne({ email: req.body.email });
  if (emailUser) {
    return res.status(400).json({ msg: "user already exists" });
  }
  // Hash Password
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  // create token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res.status(201).json({
    msg: "User created successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token,
    },
  });
});

/**
 * @desc login user
 * @route /api/auth/signin
 * @method POST
 * @access public
 */
exports.signInUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // find the user with email
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ msg: "Incorrect email or password" });
  }
  // create token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    token,
  });
});
