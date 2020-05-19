import MONGODB_URI from './utils/config';
import express from 'express';
import path from 'path';
// import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import indexRouter from './controllers/index';
import usersRouter from './controllers/users';
import mapsRouter from './controllers/maps';
import logger from './utils/logger';


logger.info('connecting to MongoDB:', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  });

var app = express();

// TODO: Make sure to use the 'proper' logger and create a page to inspect it
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const publicFolder = path.join(__dirname, 'public');
console.log('loading static content from', publicFolder);
app.use(express.static(publicFolder));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/maps', mapsRouter);

module.exports = app;