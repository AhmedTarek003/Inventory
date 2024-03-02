import style from "./addCustomer.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";
import { Createcustomer } from "../../rtk/apiCalls/customerApiCall";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, createdMsg } = useSelector((state) => state.customer);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (createdMsg) {
      navigate("/allCustomers");
    }
  }, [createdMsg, navigate]);

  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("name is required");
    if (phone.trim() === "") return toast.error("phone number is required");
    dispatch(Createcustomer({ name, phone }));
  };
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Add Customer</div>
          <form className={style.form_container} onSubmit={submitHandler}>
            <div className={style.form_group}>
              <label className={style.form_label}>Name</label>
              <input
                type="text"
                name="username"
                placeholder="enter supplier name"
                className={style.form_input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="enter supplier phone number"
                className={style.form_input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" className={style.form_btn}>
              Add
            </button>
          </form>
        </div>
      </div>
      {loading && <LoadingLoader />}
    </section>
  );
};

export default AddCustomer;
