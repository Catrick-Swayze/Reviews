const { Client } = require('pg');
const path = require('path');

var client = new Client({ database: 'fec_target_reviews' });
client.connect();
client.query('CREATE TABLE IF NOT EXISTS csv_reviews (id serial primary key, author varchar, stars int, body varchar, createdAt varchar, wouldRecommend boolean, title varchar, comfort int, style int, value int, sizing int, photos json, helpfulVotes int, productId int)', [], (err) => {
  if (err) {
    console.log(err);
    client.end();
    return;
  }
  client.query("\\COPY csv_reviews (author, stars, body, createdAt, wouldRecommend, title, comfort, style, value, sizing, photos, helpfulVotes, productId) from 'DB/reviews.csv' DELIMITER ',' CSV HEADER", () => {
    client.end();
    if (err) {
      console.log(err);
    } else {
      console.log('success!');
    }
  });
});