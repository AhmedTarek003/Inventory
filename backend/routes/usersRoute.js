const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  updateUserImageCtrl,
} = require("../controllers/usersCtrl");
const uploadPhoto = require("../middlewares/uploadFiles");
const validateObjId = require("../middlewares/vaildateObjId");
const verifyToken = require("../middlewares/verifyToken");

// /api/users
router.route("/").get(getAllUsersCtrl);
// /api/users
router
  .route("/:id")
  .get(validateObjId, getUserByIdCtrl)
  .put(validateObjId, verifyToken, updateUserCtrl)
  .delete(validateObjId, verifyToken, deleteUserCtrl);

// /api/users/userImage/:id
router
  .route("/userImage/:id")
  .put(
    validateObjId,
    verifyToken,
    uploadPhoto.single("image"),
    updateUserImageCtrl
  );

module.exports = router;
