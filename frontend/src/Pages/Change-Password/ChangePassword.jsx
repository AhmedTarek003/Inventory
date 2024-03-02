import { useState } from "react";
import Header from "../../Components/Header/Header";
import style from "./changePass.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserById } from "../../rtk/apiCalls/userApiCall";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (oldPass.trim() === "") return toast.error("Old Password is required");
    if (newPass.trim() === "") return toast.error("New Password is required");
    if (confirmNewPass.trim() === "")
      return toast.error("confirm Password is required");
    if (confirmNewPass !== newPass) {
      return toast.error("password dosn't match ");
    }
    dispatch(updateUserById(id, { oldpassword: oldPass, password: newPass }));
    setOldPass("");
    setNewPass("");
    setConfirmNewPass("");
  };
  return (
    <section>
      <Header />
      <div className="page_title">Change Password</div>
      <div className={style.container}>
        <form className={style.edit_info} onSubmit={submitHandler}>
          <div className={style.form_group}>
            <label className={style.form_lablel}>Old Password</label>
            <input
              type="password"
              name="password"
              placeholder="enter your old password"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              className={style.form_input}
            />
          </div>
          <div className={style.form_group}>
            <label className={style.form_lablel}>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="enter your new password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className={style.form_input}
            />
          </div>
          <div className={style.form_group}>
            <label className={style.form_lablel}>Confirm Password</label>
            <input
              type="password"
              name="password"
              placeholder="confirm new password"
              value={confirmNewPass}
              onChange={(e) => setConfirmNewPass(e.target.value)}
              className={style.form_input}
            />
          </div>
          <button type="submit" className={style.form_btn}>
            Change
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
