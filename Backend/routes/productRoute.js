const express = require("express");
const { requiresignIn, isAdmin } = require("../middlewares/authMidleware");
const productcontroller = require("../controllers/productController");
const formidable = require("express-formidable");
const router = express.Router();

router.post(
  "/create-product",
  requiresignIn,
  isAdmin,
  formidable(),
  productcontroller.createProductController
);
//
router.put(
  "/update-product/:pid",
  requiresignIn,
  isAdmin,
  formidable(),
  productcontroller.updateProductController
);
router.get("/get-product", productcontroller.getProductController);
router.get("/get-product/:slug", productcontroller.getSingleProduct);
router.get("/product-photo/:pid", productcontroller.getSinglePhoto);
router.delete("/delete-product/:pid", productcontroller.deleteproduct);
router.post("/product-filter", productcontroller.productFilterController);
router.get("/product-count", productcontroller.productCount);
router.get("/product-list/:page", productcontroller.productListcontroller);
router.get("/search/:keyword", productcontroller.searchProductControllers);
router.get(
  "/related-product/:pid/:cid",
  productcontroller.realtedProductController
);
router.get(
  "/product-category/:slug",
  productcontroller.productCategoryController
);
// //payment routes
// //token
// router.get("/braintree/token", productcontroller.braintreeTokenController);
// //payment
// router.post(
//   "/braintree/payment",
//   requiresignIn,
//   productcontroller.braintreeTreePymentController
// );
//probando
//crea lo qu tiene que pagar
router.post("/create-paypal-order", productcontroller.createOrder);
//crea la orden de pago
router.post("/capture-paypal-order", productcontroller.captureOrder);
//cancelar
router.get("/cancel-order", productcontroller.cancelPayment);
module.exports = router;
