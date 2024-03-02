import style from "./editSupplier.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierById } from "../../rtk/apiCalls/supplierApiCall";
import UpdateSupplier from "../../Components/UpdateSupplier/UpdateSupplier";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";

const EditSupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { supplier, loading } = useSelector((state) => state.supplier);
  useEffect(() => {
    dispatch(getSupplierById(id));
  }, [dispatch, id]);

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Edit Supplier</div>
          {supplier && supplier._id === id && (
            <UpdateSupplier supplier={supplier} id={id} />
          )}
        </div>
      </div>
      {loading && <LoadingLoader />}
    </section>
  );
};

export default EditSupplier;
