const {
  NODE_ENV, JWT_SECRET_KEY, SERVER_CONNECT, PORT,
} = process.env;

module.exports.PORT = PORT || 3000;
module.exports.SERVER_CONNECT = NODE_ENV === 'production' ? SERVER_CONNECT : 'mongodb://localhost:27017/newsexplorerdb';
module.exports.JWT_SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret-key';
