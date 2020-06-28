import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

test('maps are returned as json', async () => {
  await api
    .get('/api/maps')
    .expect(200)
    .expect('Content-Type', /application\/json/)
   mongoose.connection.close()
})