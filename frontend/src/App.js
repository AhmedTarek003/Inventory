import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import { ToastContainer } from "react-toastify";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/Edit-Profile/EditProfile";
import ChangePassword from "./Pages/Change-Password/ChangePassword";
import AllSuppliers from "./Pages/All-Suppliers/AllSuppliers";
import AddSupplier from "./Pages/Add-Supplier/AddSupplier";
import AddCustomer from "./Pages/Add-Customer/AddCustomer";
import AllCustomers from "./Pages/All-Customers/AllCustomers";
import AllCategories from "./Pages/All-Categories/AllCategories";
import AddCategory from "./Pages/Add-Category/AddCategory";
import EditCustomer from "./Pages/Edit-Customer/EditCustomer";
import EditSupplier from "./Pages/Edit-Supplier/EditSupplier";
import EditCategory from "./Pages/Edit-Category/EditCategory";
import AllProducts from "./Pages/All-Products/AllProducts";
import SuppliersTrans from "./Pages/Suppliers-Transactions/SuppliersTrans";
import CustomersTrans from "./Pages/Customers-Transactions/CustomersTrans";
import AddProduct from "./Pages/Add-Product/AddProduct";
import ImCustomers from "./Pages/Important-Customers/ImCustomers";
import InvoiceCustomer from "./Pages/Invoice-Customer/InvoiceCustomer";
import InStock from "./Pages/In-Stock/InStock";
import OutStock from "./Pages/Out-Stock/OutStock";
import SingleProduct from "./Pages/Single-Product/SingleProduct";
import { useSelector } from "react-redux";
import PrintInvoice from "./Pages/PrintInvoice/PrintInvoice";
import InvoiceSuppliers from "./Pages/Invoice-Suppliers/InvoiceSuppliers";
import NotFound from "./Pages/Not-Found/NotFound";
import Support from "./Pages/Support/Support";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer theme="colored" autoClose={1500} />
        <Routes>
          <Route
            path="/"
            element={!user ? <Navigate to={"/signIn"} /> : <Home />}
          />
          <Route
            path="/signIn"
            element={user ? <Navigate to={"/"} /> : <SignIn />}
          />
          <Route
            path="/signUp"
            element={user ? <Navigate to={"/"} /> : <SignUp />}
          />
          <Route
            path="/profile/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <Profile />}
          />
          <Route
            path="/edit-profile/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <EditProfile />}
          />
          <Route
            path="/change-password/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <ChangePassword />}
          />
          <Route
            path="/allSuppliers"
            element={!user ? <Navigate to={"/signIn"} /> : <AllSuppliers />}
          />
          <Route
            path="/add-supplier"
            element={!user ? <Navigate to={"/signIn"} /> : <AddSupplier />}
          />
          <Route
            path="/edit-supplier/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <EditSupplier />}
          />
          <Route
            path="/allCustomers"
            element={!user ? <Navigate to={"/signIn"} /> : <AllCustomers />}
          />
          <Route
            path="/ImCustomers"
            element={!user ? <Navigate to={"/signIn"} /> : <ImCustomers />}
          />
          <Route
            path="/add-customer"
            element={!user ? <Navigate to={"/signIn"} /> : <AddCustomer />}
          />
          <Route
            path="/edit-customer/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <EditCustomer />}
          />
          <Route
            path="/allCategories"
            element={!user ? <Navigate to={"/signIn"} /> : <AllCategories />}
          />
          <Route
            path="/add-category"
            element={!user ? <Navigate to={"/signIn"} /> : <AddCategory />}
          />
          <Route
            path="/edit-category/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <EditCategory />}
          />
          <Route
            path="/allProducts"
            element={!user ? <Navigate to={"/signIn"} /> : <AllProducts />}
          />
          <Route
            path="/product/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <SingleProduct />}
          />
          <Route
            path="/add-product"
            element={!user ? <Navigate to={"/signIn"} /> : <AddProduct />}
          />
          <Route
            path="/suppliersTransactions"
            element={!user ? <Navigate to={"/signIn"} /> : <SuppliersTrans />}
          />
          <Route
            path="/customersTransactions"
            element={!user ? <Navigate to={"/signIn"} /> : <CustomersTrans />}
          />
          <Route
            path="/customersInvoice"
            element={!user ? <Navigate to={"/signIn"} /> : <InvoiceCustomer />}
          />
          <Route
            path="/suppliersInvoice"
            element={!user ? <Navigate to={"/signIn"} /> : <InvoiceSuppliers />}
          />
          <Route
            path="/inStock"
            element={!user ? <Navigate to={"/signIn"} /> : <InStock />}
          />
          <Route
            path="/outOfStock"
            element={!user ? <Navigate to={"/signIn"} /> : <OutStock />}
          />
          <Route
            path="/printInvoice"
            element={!user ? <Navigate to={"/signIn"} /> : <PrintInvoice />}
          />
          <Route
            path="/support"
            element={!user ? <Navigate to={"/signIn"} /> : <Support />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
