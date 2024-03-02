import style from "./sidebar.module.css";
import { RiHome2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { useState } from "react";
import { SidebarLists } from "../../dummyData";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [drop, setDrop] = useState(null);
  const toggle = (i) => {
    if (drop === i) {
      return setDrop(null);
    }
    setDrop(i);
  };
  return (
    <div className={style.sidebar}>
      <div className={style.container}>
        <Link to={"/"} className={style.title} style={{ margin: "10px 0" }}>
          <RiHome2Fill /> Dashboard
        </Link>
        {SidebarLists?.map((list, i) => (
          <div className={style.box} key={i}>
            <div className={style.head} onClick={() => toggle(i)}>
              <div className={style.title}>
                {list?.icon} {list?.head}
              </div>
              <IoIosArrowDown
                className={
                  drop === i ? style.head_icon_open : style.head_icon_close
                }
              />
            </div>
            <ul
              className={
                drop === i ? style.head_lists_open : style.head_lists_close
              }
            >
              {list?.headLists.map((headList, index) => (
                <Link
                  to={`/${headList?.link}`}
                  className={style.list}
                  key={index}
                >
                  {headList?.title}
                </Link>
              ))}
            </ul>
          </div>
        ))}
        <Link
          to={"/support"}
          className={style.title}
          style={{
            marginTop: "40px",
            borderTop: "1px solid #ccc",
            paddingTop: "10px",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          <MdContactSupport /> Support
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
