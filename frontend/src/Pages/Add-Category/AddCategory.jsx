import style from "./addCategory.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../rtk/apiCalls/categoryApiCall";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { loading, msg } = useSelector((state) => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (msg) {
      navigate("/allCategories");
    }
  }, [msg, navigate]);
  const [category, setCategory] = useState("");
  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (category.trim() === "") return toast.error("name is required");
    dispatch(createCategory({ category }));
  };
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Add Category</div>
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
              Add
            </button>
          </form>
        </div>
      </div>
      {loading && <LoadingLoader />}
    </section>
  );
};

export default AddCategory;
