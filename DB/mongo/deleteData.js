const Reviews = require('./Reviews.js');
var mongoose = require('mongoose');


Reviews.collection.deleteMany({})
  .then(() => {
    mongoose.disconnect();
  })



console.log('DB DELETED');

