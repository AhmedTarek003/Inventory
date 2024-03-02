const Joi = require("joi");
const mongoose = require("mongoose");

const invoiceSupplier = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupllierModel",
      required: true,
    },
    supplierPhone: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    carts: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["approved", "pending"],
      message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      default: "pending",
    },
  },
  { timestamps: true }
);

const InvoiceSupplier = mongoose.model("InvoiceSupplier", invoiceSupplier);

// Validate to create invoice
const ValidateCreateInvoice = (obj) => {
  const schema = Joi.object({
    supplierPhone: Joi.string().required(),
    carts: Joi.required(),
  });
  return schema.validate(obj);
};

module.exports = { InvoiceSupplier, ValidateCreateInvoice };
