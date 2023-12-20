//const fetch = require("node-fetch");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const base = "https://api-m.sandbox.paypal.com";

const CreateOrder1 = async (data) => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await axios.post(
      url,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: data.product.cost,
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return handleResponse(response);
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error aquí si es necesario
    throw error; // O relanzar el error para que lo maneje otro lugar
  }
};

const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.APP_SECRET}`
    ).toString("base64");

    const response = await axios.post(
      `${base}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token; // Devolver directamente el token de acceso
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
const handleResponse = async (response) => {
  if (response.status === 200 || response.status === 201) {
    try {
      return response.data; // Accede directamente a los datos de la respuesta
    } catch (error) {
      throw new Error("Response is not valid JSON");
    }
  } else {
    const errorMessage = response.statusText || "Request failed";
    throw new Error(errorMessage);
  }
};

const capturePayment = async (orderId) => {
  try {
    const access_token = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await axios.post(url, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error aquí si es necesario
    throw error; // O relanzar el error para que lo maneje otro lugar
  }
};
module.exports = {
  CreateOrder1,
  generateAccessToken,
  capturePayment,
};
