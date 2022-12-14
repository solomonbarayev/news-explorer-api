const {
  JWT_SECRET = 'super_secret_key',
  NODE_ENV,
  MONGO_DB = 'mongodb://localhost:27017/news-explorer-db',
  PORT = 3000,
} = process.env;

module.exports = { JWT_SECRET, MONGO_DB, NODE_ENV, PORT };
