const router = require("express").Router();
const {
  createInvoiceCtrl,
  getAllInvoicesCtrl,
  updateInvoiceCtrl,
  getInvoiceByIdCtrl,
  deleteInvoiceCtl,
} = require("../controllers/InvoiceSuppCtrl");
const validateObjId = require("../middlewares/vaildateObjId");
const verifyToken = require("../middlewares/verifyToken");

// /api/invoicesSuppliers
router
  .route("/")
  .post(verifyToken, createInvoiceCtrl)
  .get(verifyToken, getAllInvoicesCtrl);

// /api/invoicesSuppliers/:id
router
  .route("/:id")
  .get(validateObjId, verifyToken, getInvoiceByIdCtrl)
  .put(validateObjId, verifyToken, updateInvoiceCtrl)
  .delete(validateObjId, verifyToken, deleteInvoiceCtl);

module.exports = router;
