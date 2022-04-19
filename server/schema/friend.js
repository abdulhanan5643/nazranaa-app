const mongoose = require("mongoose");

const measurementsSchema = new mongoose.Schema({
  upperChest: Number,
  chest: Number,
  lowerChest: Number,
  bodyLength: Number,
  shoulder: Number,
  waist: Number,
  hips: Number,
  sleeveLength: Number,
  sleeveRound: Number,
  underarm: Number,
  neckDeepFront: Number,
  length: Number,
  blouseLength: Number,
  neckDepthBack: Number,
  lengthWithHeels: Number,
  thigh: Number,
  rise: Number,
  neck: Number,
  topLength: Number,
  bottomLength: Number,
  pads: String,
  height: Number,
  suitSize: Number,
  shoeSize: Number,
  wrist: Number,
  ankle: Number,
});

const friendSchema = new mongoose.Schema({
  name: String,
  email: String,
  reference_client_id: "ObjectId",
  measurements: measurementsSchema,
});

module.exports = friendSchema;
