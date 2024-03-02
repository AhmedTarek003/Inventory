import style from "./editCategory.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../rtk/apiCalls/categoryApiCall";
import { useParams } from "react-router-dom";
import UpdateCategory from "../../Components/UpdateCategory/UpdateCategory";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";

const EditCategory = () => {
  const { id } = useParams();
  const { category, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Edit Category</div>
          {category && category._id === id && (
            <UpdateCategory cate={category} id={id} />
          )}
        </div>
      </div>
      {loading && <LoadingLoader />}
    </section>
  );
};

export default EditCategory;
