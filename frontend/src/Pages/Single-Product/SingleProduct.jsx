import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import style from "./singleProduct.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "../../rtk/apiCalls/productApiCall";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.product_image}>
              <img
                src={product?.productImage?.url}
                alt=""
                className={style.product_img}
              />
            </div>
            <div className={style.product_info}>
              <div className={style.product_title}>
                Name:{" "}
                <span className={style.product_name}>{product?.name}</span>
              </div>
              <div className={style.product_title}>
                Category:{" "}
                <span className={style.product_name}>{product?.category}</span>
              </div>
              <div className={style.product_title}>
                Price:{" "}
                <span className={style.product_name}>{product?.price}$</span>
              </div>
              <div className={style.product_title}>
                Stock:{" "}
                <span className={style.product_name}>
                  {product?.stock} item
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
