const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const { errors } = require('celebrate');
const {
  MONGO_DB = 'mongodb://localhost:27017/news-explorer-db',
  PORT = 3000,
} = require('./utils/config');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { limiter } = require('./middleware/limiter');

const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
mongoose.connect(MONGO_DB);

app.use(cors());

app.options('*', cors());

app.use(helmet());

// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App listening on port ${PORT}`);
});
