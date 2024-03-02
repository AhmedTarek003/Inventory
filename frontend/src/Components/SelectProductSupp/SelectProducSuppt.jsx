import { useEffect, useState } from "react";
import style from "./selectProductSupp.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../rtk/apiCalls/productApiCall";
import { invoiceSuppActions } from "../../rtk/slices/invoiceSuppSlice";
import { toast } from "react-toastify";

const SelectProductSUPP = ({ id, setSelectProduct }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  const [stock, setStock] = useState(0);
  const addCart = () => {
    if (stock <= 0) return toast.error("stock must be greater than zero");
    dispatch(
      invoiceSuppActions.getProduct({
        ...product,
        stock,
        totalPrice: stock * product.price,
      })
    );
    setSelectProduct(false);
  };
  return (
    <div className={style.select_product_page}>
      <div className={style.container}>
        <IoMdCloseCircle
          className={style.close_icon}
          onClick={() => setSelectProduct(false)}
        />
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
              Name: <span className={style.product_name}>{product?.name}</span>
            </div>
            <div className={style.product_title}>
              Price:{" "}
              <span className={style.product_name}>{product?.price}$</span>
            </div>
            <div className={style.product_title}>
              Stock:{" "}
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={style.stock_input}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={style.add_cart} onClick={addCart}>
          Add To Invoice
        </button>
      </div>
    </div>
  );
};

export default SelectProductSUPP;
