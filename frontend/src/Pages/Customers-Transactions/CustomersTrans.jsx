import style from "./cutomersTrans.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllInvoices } from "../../rtk/apiCalls/invoicApiCall";

const CustomersTrans = () => {
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.invoice);
  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Customers Transactions</div>
          <div className={style.container}>
            <div className={style.page_table}>
              <Table bordered className="mt-3">
                <thead>
                  <tr>
                    <th className={style.table_head}>#</th>
                    <th className={style.table_head}>Customer</th>
                    <th className={style.table_head}>phone</th>
                    <th className={style.table_head}>Date</th>
                    <th className={style.table_head}>Product Name</th>
                    <th className={style.table_head}>Quentey</th>
                    <th className={style.table_head}>total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices?.map((invoice, index) => (
                    <tr key={invoice?._id}>
                      <td
                        className="text-center p-2"
                        style={{ backgroundColor: "#eeeeee" }}
                      >
                        {index + 1}
                      </td>
                      <td className="text-center p-2">
                        {invoice?.customerName}
                      </td>
                      <td className="text-center p-2">
                        {invoice?.customerPhone}
                      </td>
                      <td className="text-center">
                        {
                          new Date(invoice?.createdAt)
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </td>
                      <td className="text-center p-2">
                        {invoice?.carts?.map((chart, ind) => (
                          <div key={ind}>{chart?.productID}</div>
                        ))}
                      </td>
                      <td className="text-center p-2">
                        {invoice?.carts?.map((chart, ind) => (
                          <div key={ind}>{chart?.quantity}</div>
                        ))}
                      </td>
                      <td className="text-center p-2">{invoice?.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomersTrans;
