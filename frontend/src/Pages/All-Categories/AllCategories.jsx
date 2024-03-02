import style from "./allCategories.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { IoIosAddCircle } from "react-icons/io";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../rtk/apiCalls/categoryApiCall";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
        dispatch(deleteCategory(id));
      }
    });
  };
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">All Categories</div>
          <div className={style.container}>
            <div className={style.tabel_headers}>
              <div className={style.show}>
                Show{" "}
                <span className={style.show_num}>{categories?.length}</span>{" "}
                Categories
              </div>
              <div className={style.options}>
                <Link to={"/add-category"} className={style.add_btn}>
                  <IoIosAddCircle /> Add Category
                </Link>
              </div>
            </div>
            <div className={style.page_table}>
              <Table bordered className="mt-3">
                <thead>
                  <tr>
                    <th className={style.table_head}>#</th>
                    <th className={style.table_head}>Category</th>
                    <th className={style.table_head}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category, index) => (
                    <tr key={category?._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{category?.category}</td>
                      <td>
                        <div className={style.action_options}>
                          <Link
                            to={`/edit-category/${category?._id}`}
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
                            onClick={() => deleteHandler(category?._id)}
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

export default AllCategories;
