const Reviews = require('./Reviews.js');
var mongoose = require('mongoose');

Reviews.find((err, values) => {
  if (err) {
    throw err
    return;
  } else {
  console.log(values);
  mongoose.disconnect();
  }
})

