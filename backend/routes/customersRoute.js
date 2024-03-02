const router = require("express").Router();
const {
  createCustomerCtrl,
  getAllCustomersCtrl,
  getCustomerCtrl,
  updateCustomerCtrl,
  deleteCustomerCtrl,
} = require("../controllers/customersCtrl");
const validateObjId = require("../middlewares/vaildateObjId");
const verifyToken = require("../middlewares/verifyToken");
const {
  createPhoneNumberValidator,
  updatePhoneNumberValidator,
} = require("../utils/validateMobile");

// /api/customers
router
  .route("/")
  .post(verifyToken, createPhoneNumberValidator, createCustomerCtrl)
  .get(verifyToken, getAllCustomersCtrl);

// /api/customers/:id
router
  .route("/:id")
  .get(validateObjId, verifyToken, getCustomerCtrl)
  .put(
    validateObjId,
    verifyToken,
    updatePhoneNumberValidator,
    updateCustomerCtrl
  )
  .delete(validateObjId, verifyToken, deleteCustomerCtrl);

module.exports = router;
