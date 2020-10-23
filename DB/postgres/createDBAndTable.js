const { Client } = require('pg');
var client = new Client({ database: 'postgres' });

client.connect();
client.query('create database fec_target_reviews', [], () => {
  client.end();
  client = new Client({ database: 'fec_target_reviews' });
  client.connect();
  client.query('create table if not exists reviews (id serial primary key, author varchar, stars int, body varchar, createdAt varchar, wouldRecommend boolean, title varchar, comfort int, style int, value int, sizing int, helpfulVotes int, productId int)', [], () => {
    client.end();
  });
});