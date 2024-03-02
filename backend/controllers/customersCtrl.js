const asyncHandler = require("express-async-handler");
const {
  Customer,
  validateCreateCustomer,
  validateUpdateCustomer,
} = require("../models/CustomerModel");

/**
 * @desc create a new Customer
 * @route /api/customer
 * @method POST
 * @access private(only users)
 */
exports.createCustomerCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCustomer(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const existCustomerPhone = await Customer.findOne({ phone: req.body.phone });
  if (existCustomerPhone) {
    return res.status(400).json({ msg: "customer already exists" });
  }
  const customer = await Customer.create({
    name: req.body.name,
    phone: req.body.phone,
  });
  res.status(201).json({ msg: "customer created successfully", customer });
});

/**
 * @desc Get All Customer
 * @route /api/customer
 * @method GET
 * @access private(only users)
 */
exports.getAllCustomersCtrl = asyncHandler(async (req, res) => {
  const sort = req.query.sort || "createdAt";
  const search = req.query.search || "";
  const customer = await Customer.find({
    phone: { $regex: search, $options: "i" },
  }).sort(sort);

  res.status(200).json(customer);
});

/**
 * @desc Get a Customer by id
 * @route /api/customers/:id
 * @method GET
 * @access private(only users)
 */
exports.getCustomerCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json({ msg: "Customer not found" });
  }
  res.status(200).json(customer);
});

/**
 * @desc Update a Customer by id
 * @route /api/Customers/:id
 * @method PUT
 * @access private(only users)
 */
exports.updateCustomerCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateCustomer(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json({ msg: "Customer not found" });
  }
  const updatedCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  res
    .status(200)
    .json({ msg: "customer updated successfully", updatedCustomer });
});

/**
 * @desc Delete a Customer by id
 * @route /api/Customers/:id
 * @method DELETE
 * @access private(only users)
 */
exports.deleteCustomerCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json({ msg: "Customer not found" });
  }
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  res
    .status(200)
    .json({ msg: "Customer deleted successfully", deletedCustomer });
});
