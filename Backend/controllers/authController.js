const { hashPassword, comparepassword } = require("../middlewares/authHelpers");
const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
////////////////////////
const registerController = async (req, res) => {
  const { name, email, password, phone, address, answer } = req.body;

  if (!name || !email || !password || !phone || !address || !answer) {
    return res.status(400).send({ message: "All fields are required" });
  }
  // //check user

  // Verifica si el usuario ya existe
  const existingUser = await userModel.findOne({ email });
  //res.send(existingUser);
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "User already registered",
    });
  }

  // Hashea la contraseña
  const hashedPassword = await hashPassword(password);

  // Crea un nuevo usuario
  const newUser = new userModel({
    name,
    email,
    phone,
    address,
    password: hashedPassword,
    answer,
  });

  // // Guarda el nuevo usuario en la base de datos
  await newUser.save();

  res.status(201).send({
    success: true,
    message: "User registered successfully",
    user: newUser,
  });

  // console.error("Error registering user:", error);
  // res.status(500).send({ error: "Internal server error" });
};

//Login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, error: "email or password invalidate" });
  }
  const user = await userModel.findOne({ email });
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "email not register" });
  //si es el email pero no la contraseña
  const match = await comparepassword(password, user.password);
  if (!match) {
    return res
      .status(200)
      .send({ success: false, message: "invalid password" });
  }

  //token
  const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).send({
    success: true,
    message: "login sucess",
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
    token,
  });
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    console.log(req.body);

    if (!email || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Datos de email y nueva contraseña requeridos",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "No se encontró un usuario con el email proporcionado",
      });
    }

    // Actualiza la contraseña solo si se proporciona una nueva contraseña
    if (newPassword) {
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
    }

    res.status(200).send({
      success: true,
      message: "Contraseña Cambiada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
//test controller
const testcontroller = (req, res) => {
  res.send("protect ctm,");
};
const updateProfile = async (req, res) => {
  try {
    //viene el usuario del req.user=next();
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateuser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Update Successfully",
      updateuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
module.exports = {
  registerController,
  loginController,
  testcontroller,
  forgotPasswordController,
  updateProfile,
};
