import style from "./home.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllSales,
  getIncome,
  getOrdersCount,
} from "../../rtk/apiCalls/invoicApiCall";
import { getAllCustomers } from "../../rtk/apiCalls/customerApiCall";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Chart from "../../Components/Chart/Chart";

const Home = () => {
  const { income, orders, sales } = useSelector((state) => state.invoice);
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIncome());
    dispatch(getOrdersCount());
    dispatch(getAllCustomers(""));
    dispatch(getAllSales());
  }, [dispatch]);

  const incomeRates = income?.map((i) => i.total);
  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className={style.head}>
            <div className={style.box}>
              <div className={style.box_title}>Total Sales</div>
              <div className={style.box_num}>{incomeRates?.[0]}$</div>
              <div className={style.box_body}>
                {incomeRates?.[0] > incomeRates?.[1] ? (
                  <span style={{ color: "var(--green-color)" }}>
                    <FaArrowTrendUp />{" "}
                    {(
                      incomeRates?.[0] /
                      (incomeRates?.[0] + incomeRates?.[1])
                    ).toFixed(1)}
                    %{" "}
                  </span>
                ) : (
                  <span style={{ color: "var(--red-color)" }}>
                    <FaArrowTrendDown /> -{" "}
                    {(
                      incomeRates?.[0] /
                      (incomeRates?.[0] + incomeRates?.[1])
                    ).toFixed(1)}
                    %{" "}
                  </span>
                )}
                compared with the previous month
              </div>
            </div>
            <div className={style.box}>
              <div className={style.box_title}>Orders</div>
              <div className={style.box_num}>{orders}</div>
              <div className={style.box_body}>this month</div>
            </div>
            <div className={style.box}>
              <div className={style.box_title}>Customers</div>
              <div className={style.box_num}>{customers?.length}</div>
              <div className={style.box_body}>All customers</div>
            </div>
          </div>
          <Chart data={sales} />
        </div>
      </div>
    </section>
  );
};

export default Home;
