const { Client } = require('pg');
var client = new Client({ database: 'postgres' });

client.connect();

// client.query('SELECT $1::text as message', ['Hello World!'], (err, results) => {
//   console.log(err ? err.stack : results.rows[0].message);
//   client.end();
// });

// client.query('SELECT * FROM birds', [], (err, results) => {
//   console.log(err ? err : results.rows);
//   client.end();
// })

// client.query('INSERT INTO birds (name, age) VALUES (\'TONY\', 10)', [], (err, results) => {
//   client.query('SELECT * FROM birds', [], (err, results) => {
//     console.log(err ? err : results.rows);
//     client.end();
//   });
// });

// client.query('CREATE DATABASE target', [], (err, results) => {
//   client.end();
//   if (err) {
//     console.log('could not create new db :(');
//   } else {
//     client = new Client({ database: 'target' });
//     client.connect();
//     client.query('CREATE TABLE IF NOT EXISTS reviews (love varchar, hate varchar, year integer, friendshipp Boolean)', [], (err, results) => {
//       if (err) {

//       }
//     });
//   }
// });

// client.query('CREATE DATABASE target', [], (err, results) => {
//   client.end();
//   if (err) {
//     console.log('could not create new db: ' + err);
//   } else {
//     client = new Client({ database: 'target' });
//     client.connect();
//     client.query('CREATE NEW TABLE IF NOT EXISTS reviews (love varchar, hate varchar, year integer, friendshipp Boolean)', [], (err, results) => {
//       if (err) {
//         client.end();
//         console.log('could not create table :( ' + err);
//       } else {
//         client.query('INSERT INTO reviews (love, hate, year, friendshipp) values (\'lots\', \'some\', 2012, true)', [], (err, results) => {
//           if (err) {
//             client.end();
//             console.log('could not insert insert into table: ' + err);
//           } else {
//             client.query('SELECT * from reviews', [], (err, results) => {
//               client.end();
//               console.log(err ? 'could not select: ' + err : results.rows);
//             });
//           }
//         });
//       }
//     });
//   }
// });

client.query('CREATE DATABASE smalting', [], (err, results) => {
  client.end();
  console.log(err ? 'badbadbad: ' + err : 'goodgoodgood: ' + results);
  client = new Client({ database: 'smalting' });
  client.connect();
  client.query('CREATE TABLE IF NOT EXISTS smaltingtable (col1 Boolean, col2 varchar, col3 Int)', [], (err, results) => {
    if (err) {
      client.end();
      console.log('could not create table: ' + err);
    } else {
      console.log('created table :)');
      client.query('INSERT INTO smaltingtable (col1, col2, col3) VALUES (false, \'HELLOOOO\', 26)', [], (err, results) => {
        if (err) {
          client.end();
          console.log('could not insert into table: ' + err);
        } else {
          console.log('inserted :)');
          client.query('SELECT * from smaltingtable', [], (err, results) => {
            client.end();
            console.log(err ? 'could not select: ' + err : results.rows);
          });
        }
      });
    }
  });
});

console.log('snailiens');
console.log('ling hate');