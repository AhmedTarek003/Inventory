import style from "./editCustomer.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../rtk/apiCalls/customerApiCall";
import UpdateCustomer from "../../Components/UpdateCustomer/UpdateCustomer";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";

const EditCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { customer, loading } = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [dispatch, customer, id]);

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Edit Customer</div>
          {customer && customer._id === id && (
            <UpdateCustomer customer={customer} id={id} />
          )}
        </div>
      </div>
      {loading && <LoadingLoader />}
    </section>
  );
};

export default EditCustomer;
