import style from "./imCustomers.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImportantCustomers } from "../../rtk/apiCalls/customerApiCall";

const ImCustomers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer);
  const imCustomers = customers.filter((c) => c.purchasesPrice > 1000);
  useEffect(() => {
    dispatch(getImportantCustomers(search));
  }, [dispatch, search]);
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Important Customers</div>
          <div className={style.container}>
            <div className={style.tabel_headers}>
              <div className={style.show}>
                Show{" "}
                <span className={style.show_num}>{ImCustomers?.length}</span>{" "}
                Customers
              </div>
              <div className={style.options}>
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
            <div className={style.page_table}>
              <Table bordered className="mt-3">
                <thead>
                  <tr>
                    <th className={style.table_head}>#</th>
                    <th className={style.table_head}>Name</th>
                    <th className={style.table_head}>Phone</th>
                    <th className={style.table_head}>Purchases Price</th>
                  </tr>
                </thead>
                <tbody>
                  {imCustomers?.map((customer, index) => (
                    <tr key={customer?._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{customer?.name}</td>
                      <td className="text-center">{customer?.phone}</td>
                      <td className="text-center">
                        {customer?.purchasesPrice}
                      </td>
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

export default ImCustomers;
