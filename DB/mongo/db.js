const mongoose = require('mongoose');
const uri = 'mongodb://localhost/3004';

const db = mongoose.connect(uri,  { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;