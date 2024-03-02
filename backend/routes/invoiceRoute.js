const router = require("express").Router();
const {
  createInvoiceCtrl,
  getAllInvoices,
  getIncomeCtrl,
  getOrdersCtrl,
  getIncomeOfYearCtrl,
} = require("../controllers/InvoiceCtrl");
const verifyToken = require("../middlewares/verifyToken");

// /api/invoices
router
  .route("/")
  .post(verifyToken, createInvoiceCtrl)
  .get(verifyToken, getAllInvoices);

// /api/inovices/income
router.route("/income").get(verifyToken, getIncomeCtrl);
// /api/inovices/incomeyear
router.route("/incomeyear").get(verifyToken, getIncomeOfYearCtrl);
// /api/inovices/income
router.route("/orders").get(verifyToken, getOrdersCtrl);

module.exports = router;
