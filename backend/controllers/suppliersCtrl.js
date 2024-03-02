const asyncHandler = require("express-async-handler");
const {
  Supplier,
  validateCreateSupplier,
  validateUpdateSupplier,
} = require("../models/SupplierModel");

/**
 * @desc create a new Supplier
 * @route /api/suppliers
 * @method POST
 * @access private(only users)
 */
exports.createSuppliersCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateSupplier(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const existSupplierEmail = await Supplier.findOne({ email: req.body.email });
  const existSupplierPhone = await Supplier.findOne({ phone: req.body.phone });
  if (existSupplierEmail || existSupplierPhone) {
    return res.status(400).json({ msg: "Supplier already exists" });
  }
  const supplier = await Supplier.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  res.status(201).json({ msg: "supplier created successfully", supplier });
});

/**
 * @desc Get All Suppliers
 * @route /api/suppliers
 * @method GET
 * @access private(only users)
 */
exports.getAllSuppliersCtrl = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const suppliers = await Supplier.find({
    $or: [
      { phone: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
    ],
  });
  res.status(200).json(suppliers);
});

/**
 * @desc Get a Supplier by id
 * @route /api/suppliers/:id
 * @method GET
 * @access private(only users)
 */
exports.getSupplierCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  if (!supplier) {
    return res.status(404).json({ msg: "supplier not found" });
  }
  res.status(200).json(supplier);
});

/**
 * @desc Update a Supplier by id
 * @route /api/suppliers/:id
 * @method PUT
 * @access private(only users)
 */
exports.updateSupplierCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateSupplier(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  if (!supplier) {
    return res.status(404).json({ msg: "supplier not found" });
  }
  const updatedSupplier = await Supplier.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  res
    .status(200)
    .json({ msg: "supplier updated successfully", updatedSupplier });
});

/**
 * @desc Delete a Supplier by id
 * @route /api/suppliers/:id
 * @method DELETE
 * @access private(only users)
 */
exports.deleteSupplierCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  if (!supplier) {
    return res.status(404).json({ msg: "supplier not found" });
  }
  const deleteSupplier = await Supplier.findByIdAndDelete(id);
  res
    .status(200)
    .json({ msg: "Supplier deleted successfully", deleteSupplier });
});
