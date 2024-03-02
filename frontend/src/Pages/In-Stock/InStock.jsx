import style from "./inStock.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../rtk/apiCalls/productApiCall";

const InStock = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts(""));
  }, [dispatch]);

  const productsInStock = products.filter((p) => p.stock > 0);

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Products In Stock</div>
          <div className={style.container}>
            <div className={style.productsContainer}>
              {productsInStock?.map((item) => (
                <Link
                  to={`/product/${item?._id}`}
                  className={style.product_box}
                  key={item?._id}
                >
                  <img
                    src={item?.productImage?.url}
                    alt=""
                    className={style.product_image}
                  />
                  <div className={style.product_overlay_in}>Go To Product</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InStock;
