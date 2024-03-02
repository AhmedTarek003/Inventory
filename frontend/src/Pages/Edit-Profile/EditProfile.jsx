import style from "./editProfile.module.css";
import Header from "../../Components/Header/Header";
import { useState } from "react";
import { IoCamera } from "react-icons/io5";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserById,
  updateUserImageById,
} from "../../rtk/apiCalls/userApiCall";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const EditProfile = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [file, setFile] = useState(null);

  // submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("name is required");
    if (email.trim() === "") return toast.error("email is required");
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(updateUserImageById(id, formData));
    }
    if (name !== user?.name || email !== user.email) {
      dispatch(updateUserById(id, { name, email }));
    }
  };
  return (
    <section>
      <Header />
      <div className="page_title">Edit Profile</div>
      <div className={style.container}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className={style.edit_image}>
            <img
              src={file ? URL.createObjectURL(file) : user?.profileImage?.url}
              alt=""
              className={style.edit_profile_image}
            />
            <label htmlFor="update_image" className={style.edit_image_label}>
              <IoCamera />
            </label>
            <input
              type="file"
              id="update_image"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        )}
        <form className={style.edit_info} onSubmit={submitHandler}>
          <div className={style.form_group}>
            <label className={style.form_lablel}>Name</label>
            <input
              type="text"
              name="username"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={style.form_input}
            />
          </div>
          <div className={style.form_group}>
            <label className={style.form_lablel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.form_input}
            />
          </div>
          <button type="submit" className={style.form_btn}>
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
