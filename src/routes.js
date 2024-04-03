const { addNewBooks } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: (request, h) => {
      const response = h.response({
        status: 'success',
        statusCode: 200,
        message: 'Hello World!',
      });

      response.code(200);
      return response;
    },
  },
];

module.exports = routes;
