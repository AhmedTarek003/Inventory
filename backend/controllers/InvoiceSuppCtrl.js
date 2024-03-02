const asyncHandler = require("express-async-handler");
const {
  ValidateCreateInvoice,
  InvoiceSupplier,
} = require("../models/InvoiceSuppModel");
const { Products } = require("../models/ProductModel");
const { Supplier } = require("../models/SupplierModel");
const { Alearts } = require("../models/AlertModel");

/**
 * @desc create a invoice
 * @route /api/invoicesSuppliers
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
  // get total price
  const productsHandler = await Promise.all(
    carts.map(async (item) => {
      const product = await Products.findById(item.productID);
      if (!product) {
        throw new Error(`${product.name} product not found`);
      }

      const totalprice = product.price * item.stock;
      return totalprice;
    })
  );
  // collect all price
  const totalPrice = productsHandler.reduce((a, b) => {
    return a + b;
  }, 0);
  // Customer data
  const supplierExist = await Supplier.findOne({
    phone: req.body.supplierPhone,
  });
  if (!supplierExist) {
    return res
      .status(404)
      .json({ msg: "supplier not found, please add a new supplier" });
  }
  const invoice = await InvoiceSupplier.create({
    userId: req.user._id,
    supplierId: supplierExist._id,
    supplierPhone: supplierExist.phone,
    supplierName: supplierExist.name,
    carts: req.body.carts,
    totalPrice: totalPrice,
  });
  res.status(201).json({ msg: "invoice created successfully", invoice });
});

/**
 * @desc Get All invoices
 * @route /api/invoicesSuppliers
 * @method GET
 * @access private(only users)
 */
exports.getAllInvoicesCtrl = asyncHandler(async (req, res) => {
  const invoices = await InvoiceSupplier.find().sort("-createdAt");
  res.status(200).json(invoices);
});

/**
 * @desc Get invoice By Id
 * @route /api/invoicesSuppliers/:id
 * @method GET
 * @access private(only users)
 */
exports.getInvoiceByIdCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceSupplier.findById(id);
  if (!invoice) {
    return res.status(404).json({ msg: "not found invoice" });
  }
  res.status(200).json(invoice);
});

/**
 * @desc Update invoice
 * @route /api/invoicesSuppliers/:id
 * @method PUT
 * @access private(only users)
 */
exports.updateInvoiceCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let alertsArr = [];
  const invoice = await InvoiceSupplier.findById(id);
  if (!invoice) {
    return res.status(404).json({ msg: "Invoice not found" });
  }
  if (invoice.status === "pending") {
    const updatedInvoice = await InvoiceSupplier.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "approved",
        },
      },
      { new: true }
    );
    const carts = updatedInvoice.carts;
    const invoices = await InvoiceSupplier.find().sort("-createdAt");
    for (let i = 0; i < carts.length; i++) {
      const product = await Products.findById(carts[i].productID);
      const updatedProduct = await Products.findByIdAndUpdate(
        carts[i].productID,
        {
          $set: {
            stock: carts[i].stock + product.stock,
          },
        },
        { new: true }
      );
      const alerts = await Alearts.create({
        title: "Product updated",
        desc: `${product.name} updated and added ${carts[i].stock} items to stock`,
      });
      alertsArr.push(alerts);
    }
    return res.status(200).json({ alertsArr, invoices });
  } else {
    return res.status(400).json({ msg: "approved already" });
  }
});

/**
 * @desc Delete invoice
 * @route /api/invoicesSuppliers/:id
 * @method DELETE
 * @access private(only users)
 */
exports.deleteInvoiceCtl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const invoice = await InvoiceSupplier.findById(id);
  if (!invoice) {
    return res.status(404).json({ msg: "invoice not found" });
  }
  const deletedInvoice = await InvoiceSupplier.findByIdAndDelete(id);
  res.status(200).json({ msg: "invoice deleted successfully", deletedInvoice });
});
