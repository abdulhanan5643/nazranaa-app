const mongoose = require('mongoose');
const friendSchema = require('../schema/friend');

const Friend = mongoose.model('Friend', friendSchema);

module.exports = mongoose.model('Friend');
