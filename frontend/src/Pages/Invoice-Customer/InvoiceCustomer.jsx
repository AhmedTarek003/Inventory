import style from "./invoiceCustomer.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/esm/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../rtk/apiCalls/productApiCall";
import { getAllCustomers } from "../../rtk/apiCalls/customerApiCall";
import AddCustomer from "../../Components/AddCustomer/AddCustomer";
import { invoiceActions } from "../../rtk/slices/InvoiceSlice";
import { createInvoice } from "../../rtk/apiCalls/invoicApiCall";
import { useNavigate } from "react-router-dom";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";
import SelectProduct from "../../Components/SelectProduct/SelectProduct";

const InvoiceCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Input
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
  // pages
  const [selectProduct, setSelectProduct] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  // get product id
  const [productId, setProductId] = useState(null);

  const { products } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);
  // get products in stock
  const productInStock = products?.filter((p) => p?.stock > 0);
  // invoice
  const { invoiceProducts, totalprice, customer, msg, loading } = useSelector(
    (state) => state.invoice
  );

  // useEffect
  useEffect(() => {
    if (msg) {
      navigate("/printInvoice");
    }
  }, [msg, navigate]);

  useEffect(() => {
    dispatch(getAllProducts(search));
    dispatch(getAllCustomers(phone));
  }, [dispatch, search, phone]);
  // Go To Product By Id
  const getProduct = (id) => {
    setProductId(id);
    setSelectProduct(true);
    setSearch("");
  };

  // get Customer
  const getCustomer = (customer) => {
    dispatch(invoiceActions.getCustomer(customer));
    setPhone("");
  };

  let carts = [];

  // Get product Id and quantity
  invoiceProducts.map((i) =>
    carts.push({ productID: i._id, quantity: i.quantity })
  );

  // Submit Create Invoice
  const submitCreateInvoice = (e) => {
    e.preventDefault();
    if (!customer) return toast.error("you must enter a phone number");
    if (invoiceProducts.length <= 0) return toast.error("add products");
    dispatch(createInvoice({ customerPhone: customer.phone, carts }));
    localStorage.setItem("products", JSON.stringify(invoiceProducts));
    localStorage.setItem("customer", JSON.stringify(customer));
  };

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Create Customer Invoice</div>
          <div className={style.content_container}>
            <div className={style.search_product}>
              <input
                type="search"
                placeholder="search about products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={style.search_input}
              />
              {search.trim() !== "" && (
                <div className={style.all_products}>
                  {productInStock?.length <= 0 ? (
                    <div
                      style={{
                        padding: "10px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      no products
                    </div>
                  ) : (
                    productInStock?.map((product) => (
                      <div
                        className={style.product_box}
                        key={product?._id}
                        onClick={() => getProduct(product?._id)}
                      >
                        <img
                          src={product?.productImage?.url}
                          alt=""
                          className={style.product_img}
                        />
                        <div className={style.productID}>{product?.name}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className={style.customer_data}>
              <div className={style.customer_data_title}>Customer Data : </div>
              <div className={style.customer_data_form}>
                <label className={style.customer_label}>Phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="enter customer phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={style.customer_input}
                />
                {phone.trim() !== "" && (
                  <div className={style.all_products} style={{ top: "57px" }}>
                    {customers?.length <= 0 ? (
                      <div
                        style={{
                          padding: "10px",
                          color: "red",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                        onClick={() => setAddCustomer(true)}
                      >
                        Create Customer
                      </div>
                    ) : (
                      customers?.map((customer) => (
                        <div
                          className={style.product_box}
                          key={customer?._id}
                          onClick={() => getCustomer(customer)}
                        >
                          <div className={style.productID}>
                            {customer?.name}
                          </div>
                          <div className={style.productID}>
                            {customer?.phone}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {customer && (
                <div className={style.customer_name}>
                  Name : <span>{customer?.name}</span>
                </div>
              )}
            </div>
            <div className={style.items_title}>Your Itmes : </div>
            <Table className="mt-3">
              <thead>
                <tr>
                  <th className="text-center">ProductId</th>
                  <th className="text-center">QTY</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceProducts?.map((product) => (
                  <tr key={product?._id}>
                    <td className="text-center">{product?._id}</td>
                    <td className="text-center">{product?.quantity}</td>
                    <td className="text-center">{product?.price}</td>
                    <td className="text-center">{product?.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className={style.collect_price}>
              <div className={style.all_items}>
                <div className={style.items_text}>Total Items</div>
                <div className={style.items_num}>{invoiceProducts?.length}</div>
              </div>
              <div className={style.all_items}>
                <div className={style.items_text}>Subtotal</div>
                <div className={style.items_num}>{totalprice}</div>
              </div>
              <div className={style.all_items}>
                <div className={style.items_text}>Total tax</div>
                <div className={style.items_num}>10</div>
              </div>
              <div className={style.all_items}>
                <div className={style.items_text}>Total discount</div>
                <div className={style.items_num}>10</div>
              </div>
              <div className={style.all_items}>
                <div className={style.items_text}>Total</div>
                <div className={style.items_num}>{totalprice}</div>
              </div>
            </div>
            <button
              type="submit"
              className={style.create_btn}
              onClick={submitCreateInvoice}
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
      {addCustomer && (
        <AddCustomer
          phone={phone}
          setPhone={setPhone}
          setAddCustomer={setAddCustomer}
        />
      )}
      {selectProduct && (
        <SelectProduct id={productId} setSelectProduct={setSelectProduct} />
      )}
      {loading && <LoadingLoader />}
    </section>
  );
};

export default InvoiceCustomer;
