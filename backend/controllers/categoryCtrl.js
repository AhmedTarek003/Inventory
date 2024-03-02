const asyncHandler = require("express-async-handler");
const {
  validateCreateCategory,
  Categories,
  validateUpdateCategory,
} = require("../models/CategoryModel");

/**
 * @desc create category
 * @route /api/categories
 * @method POST
 * @access private(only users)
 */
exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const categoryExist = await Categories.findOne({
    category: req.body.category,
  });
  if (categoryExist) {
    return res.status(400).json({ msg: "category already exists" });
  }
  const category = await Categories.create({
    category: req.body.category,
  });
  res.status(201).json({ msg: "category created successfully", category });
});

/**
 * @desc get All categories
 * @route /api/categories
 * @method GET
 * @access private(only users)
 */
exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Categories.find();
  res.status(201).json(categories);
});

/**
 * @desc get category By Id
 * @route /api/categories/:id
 * @method GET
 * @access private(only users)
 */
exports.getCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
  if (!category) {
    return res.status(404).json({ msg: "not found this is category" });
  }

  res.status(200).json(category);
});

/**
 * @desc update category
 * @route /api/categories/:id
 * @method PUT
 * @access private(only users)
 */
exports.updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateCategory(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { id } = req.params;
  const category = await Categories.findById(id);
  if (!category) {
    return res.status(404).json({ msg: "not found this is category" });
  }
  const categoryExist = await Categories.findOne({
    category: req.body.category,
  });
  if (categoryExist && categoryExist.category !== category.category) {
    return res.status(400).json({ msg: "category already exists" });
  }
  const updatedCategory = await Categories.findByIdAndUpdate(
    id,
    { $set: { category: req.body.category } },
    { new: true }
  );
  res
    .status(200)
    .json({ msg: "category updated successfully", updatedCategory });
});

/**
 * @desc delete category
 * @route /api/categories/:id
 * @method DELETE
 * @access private(only users)
 */
exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
  if (!category) {
    return res.status(404).json({ msg: "not found this is category" });
  }
  const deleteCategory = await Categories.findByIdAndDelete(id);
  res
    .status(200)
    .json({ msg: "category deleted successfully", deleteCategory });
});
