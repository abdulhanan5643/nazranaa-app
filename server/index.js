const http = require("http");
const axios = require("axios");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
var cron = require("node-cron");
require("dotenv").config();
const { archieveClient } = require("./functions/client");
const clientRouter = require("./routes/clientRouter");
const friendRouter = require("./routes/friendRouter");

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());

const awakeServer = async () => {
  try {
    await axios
      .get(`${process.env.baseUrl}/api`)
      .then((res) => console.log(res.data));
  } catch (err) {
    console.log(err);
  }
};
cron.schedule("0 5 * * *", () => {
  archieveClient();
});

cron.schedule("*/10 * * * *", () => {
  awakeServer();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongo dB..."))
  .catch((err) => console.log("Couldn't connect to mongo dB...", err));

app.use("/api/client", clientRouter);
app.use("/api/friend", friendRouter);
app.get("/api", (req, res) => {
  const greetings = "Congratulations. You're successfully conected to backend.";
  res.send(greetings);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
// All other GET requests not handled before will return our React app
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}...`);
});
