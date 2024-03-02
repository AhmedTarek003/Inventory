import style from "./suppliersTrans.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteSupplierInvoice,
  getAllSuppliersInvoices,
  updateSupplierInvoice,
} from "../../rtk/apiCalls/invoiceSuppApiCall";
import GetSuppInvoice from "../../Components/GetSupplierInvoice/GetSuppInvoice";

const SuppliersTrans = () => {
  const [goInvoice, setGoInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.invoiceSupp);

  useEffect(() => {
    dispatch(getAllSuppliersInvoices());
  }, [dispatch]);

  // Go To Inovice
  const goToInvoice = (id) => {
    setInvoiceId(id);
    setGoInvoice(true);
  };
  // Delete Handler
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure? You will delete this supplier",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSupplierInvoice(id));
      }
    });
  };
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Suppliers Transactions</div>
          <div className={style.container}>
            <div className={style.page_table}>
              <Table bordered className="mt-3">
                <thead>
                  <tr>
                    <th className={style.table_head}>#</th>
                    <th className={style.table_head}>Supplier Name</th>
                    <th className={style.table_head}>Supplier Phone</th>
                    <th className={style.table_head}>Date</th>
                    <th className={style.table_head}>Cost</th>
                    <th className={style.table_head}>Status</th>
                    <th className={style.table_head}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices?.map((invoice, index) => (
                    <tr key={invoice?._id}>
                      <td className="text-center ">{index + 1}</td>
                      <td className="text-center ">{invoice?.supplierName}</td>
                      <td className="text-center ">{invoice?.supplierPhone}</td>
                      <td className="text-center ">
                        {
                          new Date(invoice?.createdAt)
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </td>
                      <td className="text-center ">{invoice?.totalPrice}</td>
                      <td className="text-center">
                        <span
                          style={
                            invoice?.status === "pending"
                              ? {
                                  backgroundColor: "#ffbe33",
                                  cursor: "pointer",
                                  padding: "8px 10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }
                              : {
                                  backgroundColor: "#58ffa0",
                                  color: "#fff",
                                  padding: "8px 10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }
                          }
                          onClick={() =>
                            invoice?.status === "pending" &&
                            dispatch(updateSupplierInvoice(invoice?._id))
                          }
                        >
                          {invoice?.status}
                        </span>
                      </td>
                      <td>
                        <div className={style.action_options}>
                          <div
                            className={style.action_icon}
                            style={{
                              backgroundColor: "var(--main-color)",
                              color: "#1f1188",
                            }}
                            onClick={() => goToInvoice(invoice?._id)}
                          >
                            <MdRemoveRedEye />
                          </div>
                          {invoice?.status === "pending" && (
                            <div
                              className={style.action_icon}
                              style={{
                                backgroundColor: "var(--red-color)",
                                color: "#981818",
                              }}
                              onClick={() => deleteHandler(invoice?._id)}
                            >
                              <MdDelete />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {goInvoice && (
        <GetSuppInvoice setGoInvoice={setGoInvoice} invoiceId={invoiceId} />
      )}
    </section>
  );
};

export default SuppliersTrans;
