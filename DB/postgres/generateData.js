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

const bulkRecursiveQuery = function(numProducts, batchSize) {

  const generateQueryStringFor1Review = function($start) {
    var q = '(';
    for (var i = $start; i < $start + 12; i++) {
      q += '$' + i + ', ';
    }
    q += '$' + ($start + 12) + ')';
    return q;
  };

  const generateParamsAndQueryStringForMultipleProducts = function(firstProductId) {
    var $start = 1;
    var params = [];
    var queryString = '';
    for (var i = firstProductId; i < firstProductId + batchSize; i++) {
      var numReviews = Math.floor(Math.random() * 20 + 1);
      for (var j = 0; j < numReviews; j++) {
        params = params.concat(generateReviewParams(i));
        if ($start === 1) {
          queryString += generateQueryStringFor1Review(1);
        } else {
          queryString += ', ' + generateQueryStringFor1Review($start);
        }
        $start += 13;
      }
    }
    return { params, queryString };
  };

  const recurse = function(firstProductId) {
    var { params, queryString } = generateParamsAndQueryStringForMultipleProducts(firstProductId);
    client.query('insert into reviews (author, stars, body, createdAt, wouldRecommend, title, comfort, style, value, sizing, photos, helpfulVotes, productId) values ' + queryString, params, (err) => {
      if (firstProductId < numProducts - batchSize) {
        recurse(firstProductId + batchSize);
      } else {
        client.end();
        console.log('done generating stuff');
      }
    });
  };

  recurse(1);
};


var client = new Client({ database: 'postgres' });
client.connect();

client.query('create database fec_target_reviews', [], (err, results) => {
  client.end();

  client = new Client({ database: 'fec_target_reviews' });
  client.connect();

  client.query('CREATE TABLE IF NOT EXISTS reviews (id serial primary key, author varchar, stars int, body varchar, createdAt varchar, wouldRecommend boolean, title varchar, comfort int, style int, value int, sizing int, photos json, helpfulVotes int, productId int)', [], () => {
    bulkRecursiveQuery(10000000, 100);
  });
});