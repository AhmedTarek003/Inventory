const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/UserModel");
const { cloudinaryDelete, cloudinaryUpload } = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");

/**
 * @desc get all users
 * @route /api/users
 * @method GET
 * @access public
 */
exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/**
 * @desc get user by id
 * @route /api/users/:id
 * @method GET
 * @access public
 */
exports.getUserByIdCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
  });
});

/**
 * @desc update user by id
 * @route /api/users/:id
 * @method PUT
 * @access private(only user)
 */
exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (req.user._id !== user._id.toString()) {
    return res.status(400).json({ msg: "access denied" });
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist?.email && emailExist?.email !== user.email) {
    return res.status(400).json({ msg: "user already exists" });
  }
  // hash password
  if (req.body.password) {
    if (!(await bcrypt.compare(req.body.oldpassword, user.password))) {
      return res.status(400).json({ msg: "old password is wrong" });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res
        .status(400)
        .json({ msg: "same old password ,please change new password" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

/**
 * @desc update user Image
 * @route /api/users/userImage/:id
 * @method PUT
 * @access private(only user)
 */
exports.updateUserImageCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (req.user._id !== user._id.toString()) {
    return res.status(400).json({ msg: "access denied" });
  }
  if (!req.file) {
    return res.status(404).json({ msg: "please add a image" });
  }
  if (user.profileImage.publicId !== null) {
    await cloudinaryDelete(user.profileImage.publicId);
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUpload(imagePath);
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        profileImage: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    profileImage: updatedUser.profileImage,
  });
  fs.unlinkSync(imagePath);
});

/**
 * @desc delete user by id
 * @route /api/users/:id
 * @method DELETE
 * @access private(only user)
 */
exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (req.user._id !== user._id.toString()) {
    return res.status(400).json({ msg: "access denied" });
  }
  if (user.profileImage.publicId !== null) {
    await cloudinaryDelete(user.profileImage.publicId);
  }
  await User.findByIdAndDelete(id);
  return res.status(200).json({ msg: "user deleted successfully" });
});
