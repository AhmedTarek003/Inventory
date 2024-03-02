import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import style from "./addProduct.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../rtk/apiCalls/productApiCall";
import { getAllCategories } from "../../rtk/apiCalls/categoryApiCall";
import { useNavigate } from "react-router-dom";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { msg, loading } = useSelector((state) => state.product);
  useEffect(() => {
    if (msg) {
      navigate("/allProducts");
    }
  }, [msg, navigate]);
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("product name is required");
    if (category.trim() === "") return toast.error("choose a category");
    if (stock <= 0) return toast.error("stock must be greater than zero");
    if (price <= 0) return toast.error("price must be greater than zero");
    if (!file) return toast.error("choose a product image");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("image", file);
    dispatch(createProduct(formData));
  };

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Add Product</div>
          <div className={style.content_container}>
            <div className={style.product_container}>
              <form className={style.product_form}>
                <div className={style.form_group}>
                  <label className={style.form_label}>Product Name</label>
                  <input
                    type="text"
                    placeholder="enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={style.form_input}
                  />
                </div>
                <div className={style.form_group}>
                  <label className={style.form_label}>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={style.form_select}
                  >
                    <option value="">select category</option>
                    {categories?.map((cate) => (
                      <option value={cate.category} key={cate?._id}>
                        {cate.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={style.form_group}>
                  <label className={style.form_label}>Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className={style.form_input}
                  />
                </div>
                <div className={style.form_group}>
                  <label className={style.form_label}>Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={style.form_input}
                  />
                </div>
              </form>
              <div className={style.product_image}>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt=""
                  className={style.product_img}
                />
                <label
                  htmlFor="productImage"
                  className={style.product_image_btn}
                >
                  Choose image
                </label>
                <input
                  type="file"
                  id="productImage"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <button
              type="submit"
              className={style.addProduct_btn}
              onClick={submitHandler}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      {loading && <LoadingLoader />}
    </section>
  );
};

export default AddProduct;
