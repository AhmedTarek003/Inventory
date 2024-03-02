import Table from "react-bootstrap/esm/Table";
import style from "./printInvoice.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { invoiceActions } from "../../rtk/slices/InvoiceSlice";

const PrintInvoice = () => {
  const dispatch = useDispatch();
  const products = JSON.parse(localStorage.getItem("products"));
  const customer = JSON.parse(localStorage.getItem("customer"));
  const invoice = JSON.parse(localStorage.getItem("invoice"));
  const navigate = useNavigate();

  const createdAt = new Date(invoice.createdAt).toLocaleString();
  const date = createdAt.split(",")[0];
  const time = createdAt.split(",")[1];

  const pdfRef = useRef();

  const download = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
    });
    setTimeout(() => {
      localStorage.removeItem("products");
      localStorage.removeItem("customer");
      localStorage.removeItem("invoice");
      dispatch(invoiceActions.clearProducts());
      navigate("/customersInvoice");
    }, 2000);
  };

  return (
    <section className={style.print_page}>
      <div className={style.container}>
        <div className={style.content} ref={pdfRef}>
          <div className={style.page_title}>Inventory</div>
          <div className={style.info}>
            <div className={style.info_item}>
              <div className={style.created}>
                <div className={style.created_At}>
                  Date : <span className={style.data_span}>{date}</span>
                </div>
                <div className={style.created_At}>
                  Time : <span className={style.data_span}>{time}</span>
                </div>
              </div>
            </div>
            <div className={style.info_item}>
              company : <span className={style.item_span}>inventory</span>
            </div>
            <div className={style.info_item}>
              salespersonId :
              <span className={style.item_span}> {invoice.userId}</span>
            </div>
            <div className={style.info_item}>
              customer :
              <span className={style.item_span}> {customer.name}</span>
            </div>
          </div>
          <div className={style.products}>
            <Table className="mt-3">
              <thead>
                <tr>
                  <th className="text-center">ProductId</th>
                  <th className="text-center">QTY</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product?._id}>
                    <td className="text-center">{product?._id}</td>
                    <td className="text-center">{product?.quantity}</td>
                    <td className="text-center">{product?.price}</td>
                    <td className="text-center">{product?.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className={style.collect_price}>
            <div className={style.all_items}>
              <div className={style.items_text}>Total Items</div>
              <div className={style.items_num}>{products?.length}</div>
            </div>
            <div className={style.all_items}>
              <div className={style.items_text}>Subtotal</div>
              <div className={style.items_num}>{invoice.totalPrice}</div>
            </div>
            <div className={style.all_items}>
              <div className={style.items_text}>Total tax</div>
              <div className={style.items_num}>10</div>
            </div>
            <div className={style.all_items}>
              <div className={style.items_text}>Total discount</div>
              <div className={style.items_num}>10</div>
            </div>
            <div className={style.all_items}>
              <div className={style.items_text}>Total</div>
              <div className={style.items_num}>{invoice.totalPrice}</div>
            </div>
          </div>
        </div>
        <button type="submit" className={style.print_btn} onClick={download}>
          Print
        </button>
      </div>
    </section>
  );
};

export default PrintInvoice;
