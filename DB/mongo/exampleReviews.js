// example schema

const data = {
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
  sizing: String, // [too small, too big, true to size]
  photos: Array, //img links
  helpful: Number // number of "helpful" votes
}