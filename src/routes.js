const { addNewBooks, showAllBooks } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: showAllBooks,
  },
];

module.exports = routes;
