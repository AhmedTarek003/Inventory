import style from "./invoiceSuppliers.module.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/esm/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../rtk/apiCalls/productApiCall";
import { getAllSuppliers } from "../../rtk/apiCalls/supplierApiCall";
import { useNavigate } from "react-router-dom";
import LoadingLoader from "../../Components/LoadingSpinner/LoadingLoader";
import SelectProductSUPP from "../../Components/SelectProductSupp/SelectProducSuppt";
import { invoiceSuppActions } from "../../rtk/slices/invoiceSuppSlice";
import { createSuppInvoice } from "../../rtk/apiCalls/invoiceSuppApiCall";

const InvoiceSuppliers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Input
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
  // pages
  const [selectProduct, setSelectProduct] = useState(false);
  // get product id
  const [productId, setProductId] = useState(null);

  const { products } = useSelector((state) => state.product);
  const { suppliers } = useSelector((state) => state.supplier);
  // get products in stock
  const productInStock = products?.filter((p) => p?.stock === 0);
  // invoice
  const { invoiceProducts, totalprice, supplier, msg, loading } = useSelector(
    (state) => state.invoiceSupp
  );

  // useEffect
  useEffect(() => {
    if (msg) {
      navigate("/suppliersTransactions");
    }
  }, [msg, navigate]);

  useEffect(() => {
    dispatch(getAllProducts(search));
    dispatch(getAllSuppliers(phone));
  }, [dispatch, search, phone]);

  // Go To Product By Id
  const getProduct = (id) => {
    setProductId(id);
    setSelectProduct(true);
    setSearch("");
  };

  // get supplier
  const getCustomer = (supplier) => {
    dispatch(invoiceSuppActions.getSupplier(supplier));
    setPhone("");
  };

  let carts = [];

  // Get product Id and quantity
  invoiceProducts.map((i) => carts.push({ productID: i._id, stock: i.stock }));

  // Submit Create Invoice
  const submitCreateInvoice = (e) => {
    e.preventDefault();
    if (!supplier) return toast.error("you must enter a phone number");
    if (invoiceProducts.length <= 0) return toast.error("add products");
    dispatch(createSuppInvoice({ supplierPhone: supplier.phone, carts }));
  };

  return (
    <section>
      <Header />
      <div className="page_container">
        <Sidebar />
        <div className={style.content}>
          <div className="page_title">Create Supplier Invoice</div>
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
              <div className={style.customer_data_title}>Supplier Data : </div>
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
                    {suppliers?.length <= 0 ? (
                      <div
                        style={{
                          padding: "10px",
                          color: "red",
                          fontWeight: "500",
                        }}
                      >
                        no supplier
                      </div>
                    ) : (
                      suppliers?.map((supplier) => (
                        <div
                          className={style.product_box}
                          key={supplier?._id}
                          onClick={() => getCustomer(supplier)}
                        >
                          <div className={style.productID}>
                            {supplier?.name}
                          </div>
                          <div className={style.productID}>
                            {supplier?.phone}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {supplier && (
                <div className={style.customer_name}>
                  Supplier : <span>{supplier?.name}</span>
                </div>
              )}
            </div>
            <div className={style.items_title}>Your Itmes : </div>
            <Table className="mt-3">
              <thead>
                <tr>
                  <th className="text-center">Product</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceProducts?.map((product) => (
                  <tr key={product?._id}>
                    <td className="text-center">{product?._id}</td>
                    <td className="text-center">{product?.stock}</td>
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
                <div className={style.items_text}>Total</div>
                <div className={style.items_num}>{totalprice}</div>
              </div>
            </div>
            <button
              type="submit"
              className={style.create_btn}
              onClick={submitCreateInvoice}
            >
              Request
            </button>
          </div>
        </div>
      </div>
      {selectProduct && (
        <SelectProductSUPP id={productId} setSelectProduct={setSelectProduct} />
      )}
      {loading && <LoadingLoader />}
    </section>
  );
};

export default InvoiceSuppliers;
