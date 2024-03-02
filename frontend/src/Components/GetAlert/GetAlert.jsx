import { IoMdCloseCircle } from "react-icons/io";
import style from "./getAlert.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlertById } from "../../rtk/apiCalls/alertApiCall";
import Moment from "react-moment";

const GetAlert = ({ setAlert, alertId }) => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.alert);
  useEffect(() => {
    dispatch(getAlertById(alertId));
  }, [dispatch, alertId]);
  return (
    <div className={style.select_product_page}>
      <div className={style.container}>
        <div className={style.content}>
          <IoMdCloseCircle
            className={style.close_icon}
            onClick={() => setAlert(false)}
          />
          <div className={style.alert}>
            <div className={style.alert_head}>
              <div className={style.alert_title}>{alert?.title}</div>
              <Moment fromNow ago className={style.alert_date}>
                {alert?.createdAt}
              </Moment>
            </div>
            <div className={style.alert_desc}>{alert?.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAlert;
