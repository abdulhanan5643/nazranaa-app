const express = require("express");
const {
  registerFriend,
  getFriend,
  checkFriendLimit,
} = require("../functions/friend");

const friendRouter = express.Router();

friendRouter.post("/register", async (req, res) => {
  if (req.body.formData) {
    let data;
    try {
      data = await registerFriend(req.body.formData);
    } catch (err) {
      const response = {
        code: 500,
        status: "Internal Server Error",
        error: "Internal Server Error",
      };
      res.send(response);
    }
    const response = {
      code: 200,
      status: "OK",
      data,
    };
    res.send(response);
  } else {
    const response = {
      code: 406,
      status: "Not Acceptable",
      error: "Not Acceptable",
    };
    res.send(response);
  }
});

friendRouter.post("/checkLimit", async (req, res) => {
  res.send(await checkFriendLimit(req.body.id));
});

friendRouter.post("/get", async (req, res) => {
  res.send(await getFriend(req.body.id));
});

module.exports = friendRouter;
