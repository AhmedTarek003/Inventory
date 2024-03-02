import style from "./profile.module.css";
import Header from "../../Components/Header/Header";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserById, getUserById } from "../../rtk/apiCalls/userApiCall";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);
  // Delete Handler
  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure? You will delete your account",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserById(id));
      }
    });
  };
  return (
    <section>
      <Header />
      <div className={style.container}>
        <div>
          <img
            src={user?.profileImage?.url}
            alt=""
            className={style.profile_img}
          />
        </div>
        <div>
          <div className={style.profile_input}>
            <span className={style.profie_title}>Name : </span> {user?.name}
          </div>
          <div className={style.profile_input}>
            <span className={style.profie_title}>Email : </span> {user?.email}
          </div>
          <div className={style.profile_options}>
            <Link to={`/edit-profile/${user?._id}`}>
              <FiEdit
                className={style.profile_icon}
                style={{ color: "var(--green-color)" }}
              />
            </Link>
            <FiTrash2
              className={style.profile_icon}
              style={{ color: "var(--red-color)" }}
              onClick={deleteHandler}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
