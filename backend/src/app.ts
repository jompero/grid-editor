import express from 'express';
import path from 'path';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mapsRouter from './routes/maps';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const publicFolder = path.join(__dirname, 'public');
console.log('loading static content from', publicFolder);
app.use(express.static(publicFolder));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/maps', mapsRouter);

module.exports = app;
