import style from "./allSuppliers.module.css";
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
  deleteSupplier,
  getAllSuppliers,
} from "../../rtk/apiCalls/supplierApiCall";

const AllSuppliers = () => {
  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.supplier);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllSuppliers(search));
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
        dispatch(deleteSupplier(id));
      }
    });
  };
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">All Suppliers</div>
          <div className={style.container}>
            <div className={style.tabel_headers}>
              <div className={style.show}>
                Show <span className={style.show_num}>{suppliers?.length}</span>{" "}
                Suppliers
              </div>
              <div className={style.options}>
                <Link to={"/add-supplier"} className={style.add_btn}>
                  <IoIosAddCircle /> Add Supplier
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
                    <th className={style.table_head}>Email</th>
                    <th className={style.table_head}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers?.map((supplier, index) => (
                    <tr key={supplier?._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{supplier?.name}</td>
                      <td className="text-center">{supplier?.phone}</td>
                      <td className="text-center">{supplier?.email}</td>
                      <td>
                        <div className={style.action_options}>
                          <Link
                            to={`/edit-supplier/${supplier?._id}`}
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
                            onClick={() => deleteHandler(supplier?._id)}
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

export default AllSuppliers;
