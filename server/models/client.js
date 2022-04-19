const mongoose = require('mongoose');
const clientSchema = require('../schema/client');

const Client = mongoose.model('Client', clientSchema);

module.exports = mongoose.model('Client');
