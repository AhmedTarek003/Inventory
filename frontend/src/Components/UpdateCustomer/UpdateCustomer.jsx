import { useEffect, useState } from "react";
import style from "./updateCustomer.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../../rtk/apiCalls/customerApiCall";

const UpdateCustomer = ({ customer, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createdMsg } = useSelector((state) => state.customer);

  useEffect(() => {
    if (createdMsg) {
      navigate("/allCustomers");
    }
  }, [createdMsg, navigate]);

  const [name, setName] = useState(customer?.name);
  const [phone, setPhone] = useState(customer?.phone);
  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("name is required");
    if (phone.trim() === "") return toast.error("phone number is required");
    if (name !== customer?.name || phone !== customer?.phone) {
      dispatch(updateCustomer({ name, phone }, id));
    }
  };
  return (
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
          type="tel"
          name="phone"
          placeholder="enter supplier phone number"
          className={style.form_input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit" className={style.form_btn}>
        Edit
      </button>
    </form>
  );
};

export default UpdateCustomer;
