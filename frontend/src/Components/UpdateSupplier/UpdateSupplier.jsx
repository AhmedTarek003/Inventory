import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./updateSupplier.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSupplier } from "../../rtk/apiCalls/supplierApiCall";

const UpdateSupplier = ({ supplier, id }) => {
  const dispatch = useDispatch();
  const { createdMsg } = useSelector((state) => state.supplier);
  const navigate = useNavigate();

  useEffect(() => {
    if (createdMsg) {
      navigate("/allSuppliers");
    }
  }, [createdMsg, navigate]);

  const [name, setName] = useState(supplier?.name);
  const [email, setEmail] = useState(supplier?.email);
  const [phone, setPhone] = useState(supplier?.phone);
  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("name is required");
    if (email.trim() === "") return toast.error("email is required");
    if (phone.trim() === "") return toast.error("phone number is required");
    if (
      name !== supplier?.name ||
      email !== supplier?.email ||
      phone !== supplier?.phone
    ) {
      dispatch(updateSupplier({ name, email, phone }, id));
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
        <label className={style.form_label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="enter supplier email"
          className={style.form_input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default UpdateSupplier;
