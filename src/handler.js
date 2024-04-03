const { nanoid } = require('nanoid');

const books = require('./books');

const addNewBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = pageCount === readPage;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const showAllBooks = (request, h) => {
  const myBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h.response({
    status: 'success',
    data: {
      books: myBooks,
    },
  });

  response.code(200);
  return response;
};

const getBookById = (request, h) => {
  const { bookId } = request.params;

  const find = books.find((book) => book.id === bookId);

  if (find) {
    const response = h.response({
      status: 'success',
      data: {
        book: find,
      },
    }).code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);

  return response;
};

const updateBookById = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const dataBook = books.findIndex((book) => book.id === bookId);

  if (dataBook !== -1) {
    const finished = pageCount === readPage;

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });

      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      return response;
    }

    books[dataBook] = {
      ...books[dataBook],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);

  return response;
};

module.exports = {
  addNewBooks,
  showAllBooks,
  getBookById,
  updateBookById,
};
