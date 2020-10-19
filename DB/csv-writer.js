const faker = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('reviews.csv');
writeReviews.write('author,stars,body,createdAt,wouldRecommend,title,comfort,style,value,sizing,photos,helpfulVotes,productId\n', 'utf8');

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
  return `${faker.name.firstName()},`
    +`${getRandomNum(0, 6)},`
    +`${faker.lorem.paragraph()},`
    +`${getRandomDateString()},`
    +`${faker.random.boolean()},`
    +`${faker.random.words()},`
    +`${getRandomNum(0, 6)},`
    +`${getRandomNum(0, 6)},`
    +`${getRandomNum(0, 6)},`
    +`${getRandomNum(1, 4)},`
    +`${null},`
    +`${getRandomNum(0, 21)},`
    +`${productId}\n`;
};

const writeNReviews = function(n) {
  let productId = 0;
  const write = function() {
    let writing = true;
    while (n > 0 && writing) {
      n--;
      productId++;
      let review = generateReviewParams(productId);
      if (n === 0) {
        writeReviews.write(review, 'utf-8', () => { writeReviews.end(); });
      } else {
        writing = writeReviews.write(review, 'utf-8')
      }
    }
    if (n > 0) {
      writeReviews.once('drain', write);
    }
  };
  write();
};

const writeReviewsForNProducts = function(n, maxReviewsPerProduct) {
  n--;
  let productId = 1;
  let reviewsLeft = getRandomNum(1, maxReviewsPerProduct);
  const write = function() {
    let writing = true;
    while ((n > 0 || reviewsLeft > 1) && writing) {
      reviewsLeft--;
      if (!reviewsLeft) {
        reviewsLeft = getRandomNum(1, maxReviewsPerProduct);
        n--;
        productId++;
      }
      let review = generateReviewParams(productId);
      if (n === 0 && reviewsLeft === 0) {
        writeReviews.write(review, 'utf-8', () => { writeReviews.end(); });
      } else {
        writing = writeReviews.write(review, 'utf-8');
      }
    }
    if (n > 0 || reviewsLeft > 0) {
      writeReviews.once('drain', write);
    }
  };
  write();
};

writeReviewsForNProducts(100, 11);
