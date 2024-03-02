const asyncHandler = require("express-async-handler");
const { Products, validateAddProduct } = require("../models/ProductModel");
const path = require("path");
const fs = require("fs");
const { cloudinaryUpload, cloudinaryDelete } = require("../utils/cloudinary");

/**
 * @desc add a new product
 * @route /api/products
 * @method POST
 * @access private(only users)
 */
exports.addProductCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ msg: "please add a product image" });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const { error } = validateAddProduct(req.body);
  if (error) {
    fs.unlinkSync(imagePath);
    return res.status(400).json({ msg: error.details[0].message });
  }
  // Add Image
  const imageResult = await cloudinaryUpload(imagePath);
  const product = await Products.create({
    name: req.body.name,
    category: req.body.category,
    productImage: {
      url: imageResult.secure_url,
      publicId: imageResult.public_id,
    },
    stock: req.body.stock,
    price: req.body.price,
  });
  res.status(201).json({ msg: "product created successfully", product });
  fs.unlinkSync(imagePath);
});

/**
 * @desc get all products
 * @route /api/products
 * @method GET
 * @access private(only users)
 */
exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const products = await Products.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json(products);
});

/**
 * @desc get a product
 * @route /api/products/:id
 * @method GET
 * @access private(only users)
 */
exports.getProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "not found this product" });
  }
  res.status(200).json(product);
});

/**
 * @desc update a product
 * @route /api/products/:id
 * @method PUT
 * @access private(only users)
 */
exports.updateProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "not found this product" });
  }
  const updatedProduct = await Products.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

/**
 * @desc update a product image
 * @route /api/products/product-image/:id
 * @method PUT
 * @access private(only users)
 */
exports.updateProductImageCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "not found this product" });
  }
  if (!req.file) {
    return res.status(404).json({ msg: "you must provide a image" });
  }
  if (product.productImage.publicId !== null) {
    await cloudinaryDelete(product.productImage.publicId);
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const imageResult = await cloudinaryUpload(imagePath);

  const updatedProduct = await Products.findByIdAndUpdate(
    id,
    {
      $set: {
        productImage: {
          url: imageResult.secure_url,
          publicId: imageResult.public_id,
        },
      },
    },
    { new: true }
  );
  res.status(200).json(updatedProduct);
  fs.unlinkSync(imagePath);
});

/**
 * @desc delete a product
 * @route /api/products/:id
 * @method DELETE
 * @access private(only users)
 */
exports.deleteProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "not found this product" });
  }
  if (product.productImage.publicId !== null) {
    await cloudinaryDelete(product.productImage.publicId);
  }
  await Products.findByIdAndDelete(id);
  res.status(200).json({ msg: "product deleted successfully" });
});
