const mongoose = require('mongoose');
const db = require('./db.js');

mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
    _id: Number,
    author: String,
    stars: Number, // 0 through 5
    body: String,
    createdAt: String, // date
    wouldRecommend: Boolean,
    title: String,
    comfort: Number, // 0 - 5
    style: Number, // 0-5
    value: Number, // 0-5
    sizing: Number, // [too small, too big, true to size]
    photos: Array, //img links
    helpfulVotes: Number, // number of "helpful" votes
    productId: Number
});

const Reviews = mongoose.model('Reviews', reviewSchema);

var find = Reviews.find.bind(Reviews);
var create = Reviews.create.bind(Reviews);
var deleteOne = Reviews.deleteOne.bind(Reviews);
var findOneAndUpdate = Reviews.findOneAndUpdate.bind(Reviews);

module.exports = {
  Reviews, find, create, deleteOne, findOneAndUpdate
};