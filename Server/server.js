const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');

// const Reviews = require('../DB/mongo/Reviews');
const client = require('../DB/postgres/client.js');

const app = express();
const port = 3004;

const whitelist = ['http://localhost:3004'];

var corsOptions = {
  origin: (origin, cb) => {
    var originCheck = whitelist.indexOf(origin) !== -1;
    cb(null, originCheck);
  },
  credentials: true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/../Public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// currently too slow to work, but also not necessary for anything?
app.get('/api/reviews', (req, res) => {
  client.query('SELECT * FROM reviews', [], (err, results) => {
    if (err) {
      res.status(400).send('could not fetch reviews');
    } else {
      res.send(results.rows);
    }
  });
});

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('./Public/index.html'));
});

app.get('/api/reviews/:productId', (req, res) => {
  client.query('SELECT * FROM reviews WHERE productId=$1', [req.params.productId], (err, results) => {
    if (err) {
      res.status(400).send('could not get reviews');
    } else {
      res.send(results.rows);
    }
  });
});

// =================

app.post('/api/reviews', (req, res) => {
  const params = [req.body.author, req.body.stars, req.body.body, req.body.createdAt, req.body.wouldRecommend, req.body.title, req.body.comfort, req.body.style, req.body.value, req.body.sizing, req.body.helpfulVotes, req.body.productId];
  client.query('INSERT INTO reviews (author, stars, body, createdAt, wouldRecommend, title, comfort, style, value, sizing, helpfulVotes, productId) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', params, (err, results) => {
    if (err) {
      res.status(400).send('could not post review');
    } else {
      res.send(results);
    }
  });
});

// app.delete('/api/reviews/:id', (req, res) => {
//   Reviews.deleteOne({ _id: req.params.id }, (err, results) => {
//     if (err) {
//       res.status(400).send('could not delete review');
//     } else {
//       res.send(results);
//     }
//   });
// });

// app.put('/api/reviews/:id', (req, res) => {
//   Reviews.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, results) => {
//     if (err) {
//       res.status(400).send('could not update review');
//     } else {
//       res.send(results);
//     }
//   });
// });