// Mongoose connect is called once by the app.js & connection established
// No need to include it elsewhere
const config = require('../config');

const mongoose = require('mongoose');
const db = mongoose.connect(`mongodb://${config.DB_URL}/${config.DB_NAME}`);
exports.db = db