import { useEffect, useState } from "react";
import style from "./updateCate.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCategory } from "../../rtk/apiCalls/categoryApiCall";

const UpdateCategory = ({ cate, id }) => {
  const { msg } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (msg) {
      navigate("/allCategories");
    }
  }, [msg, navigate]);
  const [category, setCategory] = useState(cate?.category);
  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (category.trim() === "") return toast.error("name is required");
    if (category !== cate?.category) {
      dispatch(updateCategory(id, { category }));
    }
  };
  return (
    <form className={style.form_container} onSubmit={submitHandler}>
      <div className={style.form_group}>
        <label className={style.form_label}>Category</label>
        <input
          type="text"
          name="category"
          placeholder="enter category name"
          className={style.form_input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit" className={style.form_btn}>
        Edit
      </button>
    </form>
  );
};

export default UpdateCategory;
