const router = require("express").Router();
const {
  getAllAlertsCtrl,
  getAlertById,
  updateAlert,
} = require("../controllers/alertsCtrl");
const validateObjId = require("../middlewares/vaildateObjId");
const verifyToken = require("../middlewares/verifyToken");

// /api/alerts
router.route("/").get(verifyToken, getAllAlertsCtrl);
// /api/alerts/:id
router
  .route("/:id")
  .get(validateObjId, verifyToken, getAlertById)
  .put(validateObjId, verifyToken, updateAlert);

module.exports = router;
