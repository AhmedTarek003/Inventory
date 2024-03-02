import { IoMdCloseCircle } from "react-icons/io";
import style from "./getSuppInvoice.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import Moment from "react-moment";
import { getSupplierInvoiceById } from "../../rtk/apiCalls/invoiceSuppApiCall";

const GetSuppInvoice = ({ setGoInvoice, invoiceId }) => {
  const dispatch = useDispatch();
  const { invoice } = useSelector((state) => state.invoiceSupp);
  useEffect(() => {
    dispatch(getSupplierInvoiceById(invoiceId));
  }, [dispatch, invoiceId]);
  console.log(invoice);
  return (
    <div className={style.select_product_page}>
      <div className={style.container}>
        <div className={style.content}>
          <IoMdCloseCircle
            className={style.close_icon}
            onClick={() => setGoInvoice(false)}
          />
          <div className={style.invoice}>
            <div className={style.invoice_head}>
              <div className={style.info}>
                <div className={style.supplier_info}>
                  Supplier : <span>{invoice?.supplierName}</span>
                </div>
                <div className={style.supplier_info}>
                  Phone : <span>{invoice?.supplierPhone}</span>
                </div>
                <div className={style.supplier_info}>
                  Status :{" "}
                  <span
                    style={
                      invoice?.status === "pending"
                        ? { color: "#ff9b00" }
                        : { color: "var(--green-color)" }
                    }
                  >
                    {invoice?.status}
                  </span>
                </div>
                <div className={style.supplier_info}>
                  Cost : <span>{invoice?.totalPrice}$</span>
                </div>
              </div>
              <div className={style.date}>
                <div className={style.invoice_date}>
                  Date :{" "}
                  <span>
                    {
                      new Date(invoice?.createdAt)
                        .toLocaleString()
                        .split(",")[0]
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className={style.invoice_body}>
              <div className={style.carts_title}> Your Carts :</div>
              <div className={style.carts}>
                {invoice?.carts?.map((product) => (
                  <div className={style.product_box} key={product?._id}>
                    <div className={style.product_info}>
                      ProductId : <span>{product?.productID}</span>
                    </div>
                    <div className={style.product_info}>
                      Stock : <span>{product?.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSuppInvoice;
