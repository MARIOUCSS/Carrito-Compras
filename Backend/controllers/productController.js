const productModel = require("../models/productModel");
const categorymodel = require("../models/categoryModel");
const ordermodel = require("../models/orderModel");
const paypal = require("../middlewares/paypal-api");
const Order = require("../models/orderModel.js");
const fs = require("fs");
const slugify = require("slugify");
const braintree = require("braintree");
const { urlp, PAYPAL_API } = require("../middlewares/authopaypal.js");
// import { url } from "./Auth/auth";
const axios = require("axios");
//Tienes que declararlo para que leas la varibles de entorno
const dotenv = require("dotenv");
dotenv.config();
//Payment gateway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });
const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then lmb" });
    }
    //creas el producto
    const products = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    //si hay foto ese producr llena las propiedades data y contentype y guarfas
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product creado correctamente",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creando producto",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "allproducts",
      counttotal: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Obteniendo  productos",
    });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Obteniendo el  producto",
    });
  }
};
// const getSinglePhoto = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     //si hay product con propiedad photo el contentype se pone el product
//     if (product.photo.data) {
//       res.set("ContentType", product.photo.contentType);
//       return res.status(200).send({
//         success: true,
//         product,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error Obteniendo la photo",
//     });
//   }
// };
const getSinglePhoto = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType); // Corregí "contentType" a "Content-Type"
      return res.status(200).send(product.photo.data); // Envía los datos de la imagen como respuesta
    } else {
      // Si no se encuentra la imagen o no hay datos, puedes enviar un error 404
      return res.status(404).send({
        success: false,
        message: "Imagen no encontrada",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error obteniendo la foto",
    });
  }
};
const deleteproduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Producto eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error No se elimino el producto",
    });
  }
};
const updateProductController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error No se actualizo el producto",
    });
  }
};
const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    //del cliente nos manda checked[] radio [23,45]
    let arg = {};
    if (checked.length > 0) arg.category = checked;
    if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(arg);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al filtrar los productos",
    });
  }
};
const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al contar los productos",
    });
  }
};
const productListcontroller = async (req, res) => {
  try {
    const perpage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})

      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al contar los productos",
    });
  }
};
const searchProductControllers = async (req, res) => {
  try {
    //const { name } = req.body;
    //     $gte significa "mayor o igual que", indicando el límite inferior del rango de precios.
    // $lte significa "menor o igual que", indicando el límite superior del rango de precios.
    // $regex es un operador de expresión regular en MongoDB que se utiliza para realizar consultas
    // en campos que coincidan con un patrón específico.
    //
    // $or es un operador de consulta en MongoDB que se utiliza para realizar consultas
    //  condicionales combinando múltiples expresiones con una lógica tipo "o". Permite
    //   buscar documentos que cumplan al menos una de varias condiciones especificadas.
    // Por ejemplo, si estás realizando una consulta en MongoDB y quieres hacer una búsqueda
    // de texto que ignore si las letras están en mayúsculas o minúsculas, puedes usar el modi
    // ficador i junto con $regex y $options:
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al Encontrar  el producto",
    });
  }
};
const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error con   el producto",
    });
  }
};
//
const productCategoryController = async (req, res) => {
  try {
    const category = await categorymodel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error con al obtener los Productos",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    // const order = await paypal.createOrderreateOrder(req.body);
    const order = await paypal.CreateOrder1(req.body);
    // // const { cart, cost } = req.body;
    // // //
    // // const productIds = cart.map((productId) => productId.product._id);
    // // //
    // // const newOrder = new Order({
    // //   products: productIds,
    // //   payment: cost,

    // //   status: "Not Process",
    // // });

    ///////////////////////
    res.json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const captureOrder = async (req, res) => {
  const { orderID, cart } = req.body;

  try {
    const captureData = await paypal.capturePayment(orderID);
    const productIds = cart.map((productId) => productId.product._id);
    const total = cart.reduce((ac, x) => {
      const productT = x.product.price * x.cantidad;
      return ac + productT;
    }, 0);
    ///////////////
    const buyerInfo =
      captureData && captureData.payer && captureData.payer.payer_id;
    const newOrder = new Order({
      products: productIds,
      payment: total,
      buyer: buyerInfo || "Unknown",
      status: captureData.status,
    });
    await newOrder.save();
    ////////
    res.json(captureData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const cancelPayment = (req, res) => res.send("order created");
module.exports = {
  createProductController,
  getProductController,
  getSingleProduct,
  getSinglePhoto,
  deleteproduct,
  updateProductController,
  productFilterController,
  productCount,
  productListcontroller,
  searchProductControllers,
  realtedProductController,
  productCategoryController,
  // braintreeTokenController,
  // braintreeTreePymentController,
  createOrder,
  captureOrder,
  cancelPayment,
};

//ojo
// const persona = {
//   nombre: 'Juan',
//   edad: 30,
//   // dirección puede existir o no
//   direccion: {
//     calle: 'Calle Principal',
//     ciudad: 'Ciudad Ejemplo',
//     codigoPostal: '12345'
//   }
// };

// // Acceder a la propiedad calle de la dirección (haciendo verificaciones)
// const calle =
//   persona && persona.direccion && persona.direccion.calle;
