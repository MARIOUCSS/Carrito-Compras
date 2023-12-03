const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Category requerida" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      res.status(200).send({
        success: true,
        message: "Category Existe",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Nueva Categoria Creada",
      //En esta categoria trae todo
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const updateCategorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Update",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const categoricontroller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Category Update",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const singlecategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const deletecategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "categoy Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Eliminando del servidor",
    });
  }
};
module.exports = {
  createCategoryController,
  updateCategorycontroller,
  categoricontroller,
  singlecategory,
  deletecategory,
};
