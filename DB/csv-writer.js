const faker = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('DB/id-reviews.csv');
writeReviews.write('id,author,stars,body,createdAt,wouldRecommend,title,comfort,style,value,sizing,helpfulVotes,productId\n', 'utf8');

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

const generateReviewParams = function(id, productId) {
  var words = faker.random.words();
  if (words[words.length - 1] === ',') {
    words = words.slice(0, words.length - 1);
  }
  words = words.split(',').join('');
  return `${id},`
    +`${faker.name.firstName()},`
    +`${getRandomNum(0, 6)},`
    +`${faker.lorem.sentence()},`
    +`${getRandomDateString()},`
    +`${faker.random.boolean()},`
    +`${words},`
    +`${getRandomNum(0, 6)},`
    +`${getRandomNum(0, 6)},`
    +`${getRandomNum(0, 6)},`
    +`${getRandomNum(1, 4)},`
    +`${getRandomNum(0, 21)},`
    +`${productId}\n`;
};

const writeReviewsForNProducts = function(n, maxReviewsPerProduct) {
  n--;
  let id = 0;
  let productId = 1;
  let reviewsLeft = getRandomNum(1, maxReviewsPerProduct);
  const write = function() {
    let writing = true;
    while ((n > 0 || reviewsLeft > 1) && writing) {
      id++;
      reviewsLeft--;
      if (!reviewsLeft) {
        reviewsLeft = getRandomNum(1, maxReviewsPerProduct);
        n--;
        productId++;
      }
      let review = generateReviewParams(id, productId);
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

writeReviewsForNProducts(100, 10);