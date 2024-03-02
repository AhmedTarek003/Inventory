import { useState } from "react";
import style from "./signIn.module.css";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../rtk/apiCalls/authApiCall";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Submit form Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("email is required");
    if (password.trim() === "") return toast.error("password is required");
    dispatch(loginUser({ email, password }));
  };
  return (
    <section className={style.page}>
      <div className={style.overlay}>
        <form className={style.form} onSubmit={formSubmitHandler}>
          <h1 className={style.title}>Inventory</h1>
          <div className={style.form_name}>Sign In</div>
          <div className={style.form_groups}>
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
          </div>
          <button type="submit" className={style.form_btn}>
            Login
          </button>
          <div className={style.form_que}>
            <Link to={"/signUp"} className={style.que}>
              <MdAccountCircle className={style.icon} />
              create an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
