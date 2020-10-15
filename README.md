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

