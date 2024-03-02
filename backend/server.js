const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

// DB
connectDB();

// app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/suppliers", require("./routes/suppliersRoute"));
app.use("/api/customers", require("./routes/customersRoute"));
app.use("/api/products", require("./routes/productsRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/alerts", require("./routes/alertRoute"));
app.use("/api/invoices", require("./routes/invoiceRoute"));
app.use("/api/invoicesSuppliers", require("./routes/invoiceSupplierRoute"));

// Not Routes
app.use("*", (req, res, next) => {
  next(Error("Invalid route"));
});

// Global errors
app.use(errorHandler);

// server
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`server is running at ${port}`)
);
// Handle errors
process.on("unhandledRejection", (e) => {
  console.log(`unhandled rejection error ::: ${e.message}`);
  server.close(() => {
    console.log("Shutting down.....");
    process.exit(1);
  });
});
