import { useEffect, useState } from "react";
import style from "./selectProduct.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../rtk/apiCalls/productApiCall";
import { invoiceActions } from "../../rtk/slices/InvoiceSlice";

const SelectProduct = ({ id, setSelectProduct }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  const [quantity, setQuantity] = useState(1);
  const quantityHandler = (type) => {
    if (type === "INC" && product?.stock - quantity >= 0) {
      setQuantity(quantity + 1);
    }
    if (type === "DEC" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addCart = () => {
    dispatch(
      invoiceActions.getProduct({
        ...product,
        quantity,
        totalPrice: quantity * product.price,
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
              Category:{" "}
              <span className={style.product_name}>{product?.category}</span>
            </div>
            <div className={style.product_title}>
              Price:{" "}
              <span className={style.product_name}>{product?.price}$</span>
            </div>
            <div className="quantity">
              <div className="quantity-text">Quantity:</div>
              <div className="quantity-box">
                <div className="qty" onClick={() => quantityHandler("DEC")}>
                  -
                </div>
                <div className="qty num">{quantity}</div>
                <div className="qty" onClick={() => quantityHandler("INC")}>
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        {product?.stock - quantity < 0 ? (
          <h1 style={{ color: "red", marginTop: "20px" }}>Out of Stock</h1>
        ) : (
          <button type="submit" className={style.add_cart} onClick={addCart}>
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectProduct;
