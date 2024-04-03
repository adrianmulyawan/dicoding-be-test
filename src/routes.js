const { addNewBooks, showAllBooks, getBookById } = require('./handler');

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
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
];

module.exports = routes;
