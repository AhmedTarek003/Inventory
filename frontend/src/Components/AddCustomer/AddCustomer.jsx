import { useEffect, useState } from "react";
import style from "./addCustomer.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Createcustomer } from "../../rtk/apiCalls/customerApiCall";
import LoadingLoader from "../LoadingSpinner/LoadingLoader";

const AddCustomer = ({ phone, setPhone, setAddCustomer }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { loading, createdMsg } = useSelector((state) => state.customer);
  useEffect(() => {
    if (createdMsg) {
      setAddCustomer(false);
    }
  }, [createdMsg, setAddCustomer]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("name is required");
    if (phone.trim() === "") return toast.error("phone number is required");
    dispatch(Createcustomer({ name, phone }));
  };

  return (
    <div className={style.select_product_page}>
      <div className={style.container}>
        <div className={style.content}>
          <IoMdCloseCircle
            className={style.close_icon}
            onClick={() => setAddCustomer(false)}
          />
          <form className={style.form} onSubmit={submitHandler}>
            <div className={style.form_title}>Create Customer</div>
            <div className={style.form_group}>
              <label className={style.form_label}>Name</label>
              <input
                type="text"
                name="username"
                placeholder="enter customer name"
                className={style.form_input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="enter customer phone"
                className={style.form_input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" className={style.create_btn}>
              create
            </button>
          </form>
        </div>
      </div>
      {loading && <LoadingLoader />}
    </div>
  );
};

export default AddCustomer;
