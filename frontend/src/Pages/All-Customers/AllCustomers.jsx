import style from "./allCustomers.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { IoIosAddCircle } from "react-icons/io";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../rtk/apiCalls/customerApiCall";

const AllCustomers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getAllCustomers(search));
  }, [dispatch, search]);
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
        dispatch(deleteCustomer(id));
      }
    });
  };
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">All Customers</div>
          <div className={style.container}>
            <div className={style.tabel_headers}>
              <div className={style.show}>
                Show <span className={style.show_num}>{customers?.length}</span>{" "}
                Customers
              </div>
              <div className={style.options}>
                <Link to={"/add-customer"} className={style.add_btn}>
                  <IoIosAddCircle /> Add Customer
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
            <div className={style.page_table}>
              <Table bordered className="mt-3">
                <thead>
                  <tr>
                    <th className={style.table_head}>#</th>
                    <th className={style.table_head}>Name</th>
                    <th className={style.table_head}>Phone</th>
                    <th className={style.table_head}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers?.map((customer, index) => (
                    <tr key={customer?._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{customer?.name}</td>
                      <td className="text-center">{customer?.phone}</td>
                      <td>
                        <div className={style.action_options}>
                          <Link
                            to={`/edit-customer/${customer?._id}`}
                            className={style.action_icon}
                            style={{
                              backgroundColor: "var(--green-color)",
                              color: "#147834",
                            }}
                          >
                            <MdEdit />
                          </Link>
                          <div
                            className={style.action_icon}
                            style={{
                              backgroundColor: "var(--red-color)",
                              color: "#981818",
                            }}
                            onClick={() => deleteHandler(customer?._id)}
                          >
                            <MdDelete />
                          </div>
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
    </section>
  );
};

export default AllCustomers;
