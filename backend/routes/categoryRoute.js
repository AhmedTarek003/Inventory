const router = require("express").Router();
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  updateCategoryCtrl,
  getCategoryCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryCtrl");
const validateObjId = require("../middlewares/vaildateObjId");

const verifyToken = require("../middlewares/verifyToken");

// /api/categories
router
  .route("/")
  .post(verifyToken, createCategoryCtrl)
  .get(verifyToken, getAllCategoriesCtrl);

// /api/categories/:id
router
  .route("/:id")
  .get(validateObjId, verifyToken, getCategoryCtrl)
  .put(validateObjId, verifyToken, updateCategoryCtrl)
  .delete(validateObjId, verifyToken, deleteCategoryCtrl);

module.exports = router;
