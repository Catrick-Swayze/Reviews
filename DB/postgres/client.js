const { Client } = require('pg');
const client = new Client({ database: 'fec_target_reviews' });

client.connect();

module.exports = client;