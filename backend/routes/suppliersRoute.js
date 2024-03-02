const router = require("express").Router();

const {
  createSuppliersCtrl,
  getAllSuppliersCtrl,
  getSupplierCtrl,
  updateSupplierCtrl,
  deleteSupplierCtrl,
} = require("../controllers/suppliersCtrl");
const validateObjId = require("../middlewares/vaildateObjId");
const verifyToken = require("../middlewares/verifyToken");
const {
  createPhoneNumberValidator,
  updatePhoneNumberValidator,
} = require("../utils/validateMobile");

// /api/suppliers
router
  .route("/")
  .post(verifyToken, createPhoneNumberValidator, createSuppliersCtrl)
  .get(verifyToken, getAllSuppliersCtrl);

// /api/suppliers/:id
router
  .route("/:id")
  .get(validateObjId, verifyToken, getSupplierCtrl)
  .put(
    validateObjId,
    verifyToken,
    updatePhoneNumberValidator,
    updateSupplierCtrl
  )
  .delete(validateObjId, verifyToken, deleteSupplierCtrl);

module.exports = router;
