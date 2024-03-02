const router = require("express").Router();
const {
  addProductCtrl,
  getAllProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  updateProductImageCtrl,
} = require("../controllers/productCtrl");
const uploadPhoto = require("../middlewares/uploadFiles");
const validateObjId = require("../middlewares/vaildateObjId");
const verifyToken = require("../middlewares/verifyToken");

// /api/products
router
  .route("/")
  .post(verifyToken, uploadPhoto.single("image"), addProductCtrl)
  .get(verifyToken, getAllProductsCtrl);

// /api/products/:id
router
  .route("/:id")
  .get(validateObjId, verifyToken, getProductCtrl)
  .put(validateObjId, verifyToken, updateProductCtrl)
  .delete(validateObjId, verifyToken, deleteProductCtrl);

// /api/products/product-image/:id
router
  .route("/product-image/:id")
  .put(
    validateObjId,
    verifyToken,
    uploadPhoto.single("image"),
    updateProductImageCtrl
  );
module.exports = router;
