import style from "./outStock.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../rtk/apiCalls/productApiCall";

const OutStock = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts(""));
  }, [dispatch]);

  const productsOutStock = products.filter((p) => p.stock <= 0);

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Products Out Of Stock</div>
          <div className={style.container}>
            <div className={style.productsContainer}>
              {productsOutStock?.map((item) => (
                <div className={style.product_box} key={item?._id}>
                  <img
                    src={item?.productImage?.url}
                    alt=""
                    className={style.product_image}
                  />

                  <div className={style.product_overlay_out}>out of Stock</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutStock;
