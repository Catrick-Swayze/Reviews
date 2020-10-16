const { Client } = require('pg');
const faker = require('faker');

const getRandomNum = function(min, max) {
  return Math.floor((Math.random() * (max - min) + min));
};

const getRandomDateString = function() {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };
  var date = faker.date.past().toString().split(' ');
  return `${date[3]}-${months[date[1]]}-${date[2]}`;
};

const generateReviewParams = function(productId) {
  return [
    faker.name.firstName(),
    getRandomNum(0, 6),
    faker.lorem.paragraph(),
    getRandomDateString(),
    faker.random.boolean(),
    faker.random.words(),
    getRandomNum(0, 6),
    getRandomNum(0, 6),
    getRandomNum(0, 6),
    getRandomNum(1, 4),
    null,
    getRandomNum(0, 21),
    productId
  ];
};

const recursiveQuery = function(productId, reviewId, numReviews, firstReview) {
  client.query('insert into reviews (author, stars, body, createdAt, wouldRecommend, title, comfort, style, value, sizing, photos, helpfulVotes, productId) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', generateReviewParams(productId), (err) => {
    if (err) {
      console.log('ERROR: ' + err);
    }
    if (reviewId < numReviews) {
      recursiveQuery(productId, reviewId + 1, numReviews, false);
    } else if (productId < 100) {
      recursiveQuery(productId + 1, 1, Math.floor(Math.random() * 20 + 1), true);
    } else {
      client.end();
      console.log('finished');
    }
  });
};

var client = new Client({ database: 'postgres' });
client.connect();

client.query('create database fec_target_reviews', [], (err, results) => {
  client.end();

  client = new Client({ database: 'fec_target_reviews' });
  client.connect();

  client.query('CREATE TABLE IF NOT EXISTS reviews (id serial primary key, author varchar, stars int, body varchar, createdAt varchar, wouldRecommend boolean, title varchar, comfort int, style int, value int, sizing int, photos json, helpfulVotes int, productId int)', [], (err) => {
    if (err) {
      client.end();
      console.log('1: ' + err);
    } else {
      recursiveQuery(1, 1, Math.floor(Math.random() * 20 + 1), true);
    }
  });
});