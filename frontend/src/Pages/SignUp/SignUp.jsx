import { useState } from "react";
import style from "./signUp.module.css";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../rtk/apiCalls/authApiCall";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();

  // Submit form Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("name is required");
    if (email.trim() === "") return toast.error("email is required");
    if (password.trim() === "") return toast.error("password is required");
    if (confirmPass.trim() === "")
      return toast.error("confirm password is required");
    if (confirmPass !== password) return toast.error("password is not match");
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <section className={style.page}>
      <div className={style.overlay}>
        <form className={style.form} onSubmit={formSubmitHandler}>
          <h1 className={style.title}>Inventory</h1>
          <div className={style.form_name}>Sign Up</div>
          <div className={style.form_groups}>
            <div className={style.form_group}>
              <label className={style.form_label}>Name</label>
              <input
                type="text"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="enter your name"
                className={style.form_input}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
                className={style.form_input}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                className={style.form_input}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>password</label>
              <input
                type="password"
                name="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="confirm your password"
                className={style.form_input}
              />
            </div>
          </div>
          <button type="submit" className={style.form_btn}>
            Create
          </button>
          <div className={style.form_que}>
            <Link to={"/signIn"} className={style.que}>
              <MdAccountCircle className={style.icon} />
              have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
