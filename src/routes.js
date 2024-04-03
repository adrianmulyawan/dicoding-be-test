const {
  addNewBooks,
  showAllBooks,
  getBookById,
  updateBookById,
} = require('./handler');

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
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookById,
  },
];

module.exports = routes;
