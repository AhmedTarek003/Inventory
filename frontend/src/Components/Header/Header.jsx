import { useEffect, useState } from "react";
import style from "./header.module.css";
import { FaBell, FaLock } from "react-icons/fa6";
import { IoPerson, IoLogOutOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../rtk/apiCalls/authApiCall";
import { getAllAlerts, updateAlert } from "../../rtk/apiCalls/alertApiCall";
import Moment from "react-moment";
import GetAlert from "../GetAlert/GetAlert";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [aleart, setAleart] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertId, setAlertId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { alerts } = useSelector((state) => state.alert);
  useEffect(() => {
    dispatch(getAllAlerts());
  }, [dispatch, alertId]);
  const alertsNum = alerts.filter((a) => a.show === false);

  const aleartHandle = () => {
    setDropdown(false);
    setAleart(() => !aleart);
  };
  const dropHandle = () => {
    setAleart(false);
    setDropdown(() => !dropdown);
  };
  const goToAlert = (id) => {
    setAlertId(id);
    setAlert(true);
    dispatch(updateAlert(id));
  };

  return (
    <div className={style.header}>
      <Link to={"/"} className={style.logo}>
        Inventory
      </Link>
      <div className={style.right}>
        <div className={style.alert} onClick={aleartHandle}>
          <FaBell className={style.icon} />
          {alertsNum?.length > 0 && (
            <span className={style.alrets_msg}>{alertsNum?.length}</span>
          )}

          {aleart && (
            <div
              className={style.aleart_dropmsg}
              style={
                alerts?.length <= 5 ? { height: "auto" } : { height: "50vh" }
              }
            >
              {alerts.map((alert) => (
                <div
                  className={style.box_msg}
                  key={alert?._id}
                  onClick={() => goToAlert(alert?._id)}
                >
                  <div className={style.box_msg_head}>
                    <div className={style.msg_title}>{alert?.title}</div>
                    <Moment fromNow ago className={style.msg_time}>
                      {alert?.createdAt}
                    </Moment>
                  </div>
                  {alert?.show === false ? (
                    <div className={style.alert_show}>
                      <div className={style.msg_des}>{alert?.desc}</div>
                      <span className={style.alert_point}></span>
                    </div>
                  ) : (
                    <div className={style.msg_des}>{alert?.desc}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.account} onClick={dropHandle}>
          <div className={style.account_name}>{user?.name}</div>
          <img
            src={user?.profileImage?.url}
            alt=""
            className={style.account_image}
          />
        </div>
        {dropdown && (
          <ul className={style.dropdown}>
            <Link to={`/profile/${user?._id}`} className={style.dropdown_list}>
              <IoPerson className={style.drop_icon} />
              Profile
            </Link>
            <Link
              to={`/edit-profile/${user?._id}`}
              className={style.dropdown_list}
            >
              <FaUserEdit />
              Edit Profile
            </Link>
            <Link
              to={`/change-password/${user?._id}`}
              className={style.dropdown_list}
            >
              <FaLock /> Change Password
            </Link>
            <li
              className={style.dropdown_list}
              onClick={() => dispatch(logoutUser())}
            >
              <IoLogOutOutline />
              Logout
            </li>
          </ul>
        )}
      </div>
      {alert && <GetAlert setAlert={setAlert} alertId={alertId} />}
    </div>
  );
};

export default Header;
