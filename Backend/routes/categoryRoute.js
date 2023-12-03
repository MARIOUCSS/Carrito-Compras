const express = require("express");
const router = express.Router();
const RegisterControl = require("../middlewares/authMidleware");
const CreateControllerCategory = require("../controllers/categoryControllers");
router.post(
  "/create-category",
  RegisterControl.requiresignIn,
  RegisterControl.isAdmin,
  CreateControllerCategory.createCategoryController
);
router.put(
  "/update-category/:id",
  RegisterControl.requiresignIn,
  RegisterControl.isAdmin,
  CreateControllerCategory.updateCategorycontroller
);
router.get("/get-category", CreateControllerCategory.categoricontroller);
router.get("/single-category/:slug", CreateControllerCategory.singlecategory);
router.delete(
  "/delete-category/:id",
  RegisterControl.requiresignIn,
  RegisterControl.isAdmin,
  CreateControllerCategory.deletecategory
);
module.exports = router;
