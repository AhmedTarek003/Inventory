const asyncHandler = require("express-async-handler");
const { ValidateCreateInvoice, Invoice } = require("../models/InvoiceModel");
const { Products } = require("../models/ProductModel");
const { Customer } = require("../models/CustomerModel");
const { Alearts } = require("../models/AlertModel");

/**
 * @desc create a invoice
 * @route /api/invoices
 * @method POST
 * @access private(only users)
 */
exports.createInvoiceCtrl = asyncHandler(async (req, res, next) => {
  const { error } = ValidateCreateInvoice(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const carts = req.body.carts;
  // Check if invoice has a products not found && if products same
  for (let i = 0; i < carts.length; i++) {
    for (let j = i + 1; j < carts.length; j++) {
      if (
        !(await Products.findById(carts[i].productID)) ||
        !(await Products.findById(carts[j].productID))
      ) {
        return res.status(404).json({ msg: "not found product" });
      }

      if (
        JSON.stringify(carts[i].productID) ===
        JSON.stringify(carts[j].productID)
      ) {
        return res.status(400).json({ msg: "the same product" });
      }
    }
  }
  // check if products quantity less than product stock && update product stock && get total price
  // && create Aleart if product Stock closer to end
  const productsHandler = await Promise.all(
    carts.map(async (item) => {
      const product = await Products.findById(item.productID);
      if (!product) {
        throw new Error(`${product.name} product not found`);
      }
      if (product.stock - item.quantity < 0) {
        throw new Error(
          `${product.name} is Out of stock, this product has ${product.stock} items`
        );
      }
      // Update Product
      const updatedProduct = await Products.findByIdAndUpdate(
        item.productID,
        {
          $set: {
            stock: product.stock - item.quantity,
          },
        },
        { new: true }
      );
      if (updatedProduct.stock < 10 && updatedProduct.stock !== 0) {
        await Alearts.create({
          title: "Products",
          desc: `${product.name} less than 10 `,
        });
      }
      if (updatedProduct.stock === 0) {
        await Alearts.create({
          title: "Products",
          desc: `${product.name} Out of stock`,
        });
      }
      const totalprice = product.price * item.quantity;
      return totalprice;
    })
  );
  // collect all price
  const totalPrice = productsHandler.reduce((a, b) => {
    return a + b;
  }, 0);
  // Customer data
  const customerExist = await Customer.findOne({
    phone: req.body.customerPhone,
  });
  if (!customerExist) {
    return res
      .status(404)
      .json({ msg: "customer not found, please add a new customer" });
  }
  await Customer.findByIdAndUpdate(
    customerExist._id,
    {
      $set: {
        purchasesPrice: customerExist.purchasesPrice + totalPrice,
      },
    },
    { new: true }
  );
  const invoice = await Invoice.create({
    userId: req.user._id,
    customerId: customerExist._id,
    customerPhone: customerExist.phone,
    customerName: customerExist.name,
    carts: req.body.carts,
    totalPrice: totalPrice,
  });
  res.status(201).json({ msg: "invoice created successfully", invoice });
});

/**
 * @desc Get All invoice
 * @route /api/invoices
 * @method GET
 * @access private(only users)
 */
exports.getAllInvoices = asyncHandler(async (req, res) => {
  const invoice = await Invoice.find().sort("-createdAt");
  res.status(200).json(invoice);
});

/**
 * @desc Get income
 * @route /api/invoices/income
 * @method GET
 * @access private(only users)
 */
exports.getIncomeCtrl = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const lastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1
  );
  const previousMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth() - 1
  );

  const result = await Invoice.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);
  const incomeByMonth = [];
  for (
    let year = previousMonth.getFullYear();
    year <= currentDate.getFullYear();
    year++
  ) {
    for (
      let month = currentDate.getMonth() + 1;
      month >= previousMonth.getMonth() + 1;
      month--
    ) {
      const monthData = result.find((item) => item._id === month);
      if (monthData) {
        incomeByMonth.push({ _id: month, total: monthData.total });
      } else {
        incomeByMonth.push({ _id: month, total: 0 });
      }
    }
  }

  res.status(200).json(incomeByMonth);
});

/**
 * @desc Get Orders count
 * @route /api/invoices/income
 * @method GET
 * @access private(only users)
 */
exports.getOrdersCtrl = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const invoices = await Invoice.countDocuments({
    createdAt: { $gte: lastMonth },
  });
  res.status(200).json(invoices);
});

/**
 * @desc Get income
 * @route /api/invoices/incomeyear
 * @method GET
 * @access private(only users)
 */
exports.getIncomeOfYearCtrl = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const sales = await Invoice.aggregate([
    { $match: { createdAt: { $gte: firstDayOfYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$month",
        sales: { $sum: "$sales" },
      },
    },
  ]).sort("_id");
  const incomeByMonth = [];
  for (
    let year = firstDayOfYear.getFullYear();
    year <= currentDate.getFullYear();
    year++
  ) {
    for (
      let month = firstDayOfYear.getMonth() + 1;
      month <= currentDate.getMonth() + 1;
      month++
    ) {
      const monthData = sales.find((item) => item._id === month);
      if (monthData) {
        incomeByMonth.push({ _id: month, sales: monthData.sales });
      } else {
        incomeByMonth.push({ _id: month, sales: 0 });
      }
    }
  }
  res.status(200).json(incomeByMonth);
});
