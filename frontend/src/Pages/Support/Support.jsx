import { useState } from "react";
import Header from "../../Components/Header/Header";
import style from "./support.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("write your problem first");
    toast.success("your problem sent successfully");
    setText("");
    navigate("/");
  };
  return (
    <section className={style.page}>
      <Header />
      <div className={style.container}>
        <form className={style.form_container} onSubmit={submitHandler}>
          <textarea
            placeholder="write your problem.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={style.problem_box}
          />
          <button type="submit" className={style.form_btn}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Support;
