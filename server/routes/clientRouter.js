const express = require("express");
const {
  registerClient,
  getAllClients,
  verifyClient,
  archieveClient,
  getDetails,
} = require("../functions/client");

const clientRouter = express.Router();

clientRouter.post("/verify", async (req, res) => {
  res.send(await verifyClient(req.body.formData));
});

clientRouter.post("/archieve", async (req, res) => {
  try {
    await archieveClient(req.body.id);
    res.send({
      code: 200,
      message: "Client Archieved!",
    });
  } catch (err) {
    res.send(err);
  }
});

clientRouter.post("/details", async (req, res) => {
  if (req.body.id) {
    const response = {
      code: 200,
      status: "OK",
      data: await getDetails(req.body.id),
    };
    await getDetails(req.body.id);
    res.send(response);
  } else {
    const response = {
      code: 500,
      status: "Internal Server Error",
      error: "Internal Server Error",
    };
    res.send(response);
  }
});

clientRouter.get("/get", async (req, res) => {
  res.send(await getAllClients());
});

clientRouter.post("/add", async (req, res) => {
  if (req.body.formData) {
    try {
      const response = {
        code: 200,
        status: "OK",
        data: await registerClient(req.body.formData),
      };
      await registerClient(req.body.formData);
      res.send(response);
    } catch (err) {
      const response = {
        code: 500,
        status: "Internal Server Error",
        error: "Internal Server Error",
      };
      res.send(response);
    }
  } else {
    const response = {
      code: 406,
      status: "Not Acceptable",
      error: "Not Acceptable",
    };
    res.send(response);
  }
});

module.exports = clientRouter;
