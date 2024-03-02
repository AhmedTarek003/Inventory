const router = require("express").Router();
const { signUpUserCtrl, signInUserCtrl } = require("../controllers/authCtrl");

// /api/auth/signup
router.route("/signup").post(signUpUserCtrl);
// /api/auth/signin
router.route("/signin").post(signInUserCtrl);

module.exports = router;
