# target_reviews_component

This service provides the reviews component of a Target item page.

To start this service:

Install dependancies via "npm install"

Start the server via "npm start"

In another terminal window, seed the database by typing "npm run db:seed"

Have webpack watch the files via "npm run build"

Reviews should now be rendered on port 3001.

====

CRUD documentation:

* Create a review with a POST request to /api/reviews, including a review object as data;
* Read all reviews with a GET request to /api/reviews; read reviews for a single item by productId with a GET request to /api/reviews/:id;
* Update a single review by _id with a PUT request to /api/reviews/:id, including an update object as data;
* Delete a single review by _id with a DELETE request to /api/reviews/:id;

===

Startup:
Create db and table with script 'db-prep';
Create csv file with script 'csv'
In terminal, run 'psql fec_target_reviews' to enter postgres;
Seed db with postgres command '\COPY reviews FROM 'DB/big-id-reviews.csv' DELIMITER ',' CSV HEADER;';
Index productsId column with postgres command 'create index on reviews (productId);';
Set id auto_incrementer to right position with postgres command "SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews)+1);";