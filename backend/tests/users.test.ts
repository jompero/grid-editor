import mongoose from 'mongoose';
import app from '../src/app';
import supertest from 'supertest';
import users, { User } from '../src/models/user';

const userInfo = {
    profile: 'profile',
    profileId: 'asd',
    email: 'asd',
    name: 'Tester123'
  }

  
const api = supertest(app);

beforeAll(async () => {
  await users.deleteMany({});
  await users.create(userInfo);
});

describe('users api', () => {
  test('returns users as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('returns one user', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
    expect(response.body).toHaveLength(1);
  });
});

afterAll(async () => {
  mongoose.connection.close()
});
