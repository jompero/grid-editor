import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config';

import usersRouter from './controllers/users';
import mapsRouter from './controllers/maps';
import testingRouter from './controllers/testing';
import logger from './utils/logger';

const env = process.env.NODE_ENV;
logger.info(`server running in ${env || 'default'} environment`);
logger.info('connecting to MongoDB:', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

const app = express();

app.use(morgan('short'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users/', usersRouter);
app.use('/api/maps/', mapsRouter);

if (env === 'test') {
  app.use('/api/testing/', testingRouter);
}

const publicFolder = path.join(__dirname, 'public');
logger.info('loading static content from', publicFolder);
app.use(express.static(publicFolder));
app.get('*', (req, res) => {
  res.sendFile(publicFolder + '/index.html');
});

export default app;
