const Joi = require("joi");
const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerModel",
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerName: {
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
        quantity: {
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
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

// Validate to create invoice
const ValidateCreateInvoice = (obj) => {
  const schema = Joi.object({
    customerPhone: Joi.string().required(),
    carts: Joi.required(),
  });
  return schema.validate(obj);
};

module.exports = { Invoice, ValidateCreateInvoice };
