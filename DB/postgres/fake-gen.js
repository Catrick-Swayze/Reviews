const { Client } = require('pg');
var client = new Client({ database: 'postgres' });

// const recursiveQuery = function(productId, reviewId, numReviews, firstReview) {
//   client.query('insert into testing (productId, reviewId) values ($1, $2)', [productId, reviewId], () => {
//     if (reviewId < numReviews) {
//       recursiveQuery(productId, reviewId + 1, numReviews, false);
//     } else if (productId < 10) {
//       recursiveQuery(productId + 1, 1, Math.floor(Math.random() * 5 + 1), true);
//     } else {
//       client.end();
//       console.log('donzsoo!');
//     }
//   });
// };

// client.connect();

// client.query('create database nstest', [], (err, results) => {
//   client.end();

//   client = new Client({ database: 'nstest' });
//   client.connect();

//   client.query('CREATE TABLE IF NOT EXISTS testing (id serial primary key, productId int, reviewId int)', [], (err) => {
//     if (err) {
//       client.end();
//       console.log('1: ' + err);
//     } else {
//       recursiveQuery(1, 1, Math.floor(Math.random() * 5 + 1), true);
//     }
//   });
// });

client = new Client({ database: 'nstest' });
client.connect();
client.query('CREATE TABLE IF NOT EXISTS testing (id serial primary key, productId int, reviewId int)', [], () => {
  client.query('INSERT INTO testing (productId, reviewId) values ($1, $2), ($3, $4), ($5, $6)', [11, 12, 13, 14, 15, 16], () => {
    client.end();
  });
});
