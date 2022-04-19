const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  name: String,
  date: { type: Date },
  form: String,
  video: String,
  phone_number: Number,
  friends_allowed: Number,
  active: Boolean,
});

module.exports = clientSchema;
