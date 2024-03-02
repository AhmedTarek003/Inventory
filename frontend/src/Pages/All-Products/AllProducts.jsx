import style from "./allProducts.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../rtk/apiCalls/productApiCall";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts(search));
  }, [dispatch, search]);

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">All Products</div>
          <div className={style.container}>
            <div className={style.tabel_headers}>
              <div className={style.show}>
                Show <span className={style.show_num}>{products?.length}</span>{" "}
                Products
              </div>
              <div className={style.options}>
                <Link to={"/add-product"} className={style.add_btn}>
                  <IoIosAddCircle /> Add Products
                </Link>
                <div className={style.search_bar}>
                  <input
                    type="text"
                    placeholder="search here..."
                    className={style.search_bar_input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={style.productsContainer}>
              {products?.length <= 0 ? (
                <h1>No Products</h1>
              ) : (
                products?.map((item) =>
                  item?.stock > 0 ? (
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

                      <div className={style.product_overlay_in}>
                        Go To Product
                      </div>
                    </Link>
                  ) : (
                    <div className={style.product_box} key={item?._id}>
                      <img
                        src={item?.productImage?.url}
                        alt=""
                        className={style.product_image}
                      />
                      <div className={style.product_overlay_out}>
                        out of Stock
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
