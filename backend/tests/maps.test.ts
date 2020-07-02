import mongoose from 'mongoose';
import app from '../src/app';
import supertest from 'supertest';
import maps from '../src/models/tileMap';
import users, { User } from '../src/models/user';

const userInfo = {
  profile: 'profile',
  profileId: 'asd',
  email: 'asd',
  name: 'Tester123'
}

let user: any;

const testMaps = [
  {
    name: 'testMap1',
    width: 16,
    height: 16,
    tileMap: new Array(16*16).fill(-1),
    tileSet: 'Harbour',
  },
  {
    name: 'testMap2',
    width: 16,
    height: 16,
    tileMap: new Array(16*16).fill(-1),
    tileSet: 'Harbour',
  },
  {
    width: 16,
    height: 16,
    tileSet: 'Harbour',
  }
];

const api = supertest(app);

beforeAll(async () => {
  await users.deleteMany({});
  await maps.deleteMany({});
  await users.create(userInfo);
  user = await users.findOne({ profileId: userInfo.profileId });
  await maps.create({ ...testMaps[0], user: user.id });
  await maps.create({ ...testMaps[1], user: user.id });
});

describe('maps api', () => {
  test('returns maps as json', async () => {
    await api
      .get('/api/maps')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('returns two maps', async () => {
    const response = await api
      .get('/api/maps')
      .expect(200)
    expect(response.body).toHaveLength(2);
  });

  test('assigns user correctly to a saved map', async () => {
    const response: any = await api
      .get('/api/maps')
      .expect(200)
      expect(response.body[0].user.name).toBe('Tester123');
  })

  test('fills in name and an empty tilemap if missing', async () => {
    //await maps.create({ ...testMaps[2], user: user.id });
    const response: any = await api
    .post('/api/maps')
    .send({ ...testMaps[2], user: user.id })
    .expect(200)
    //expect(response.body).toHaveLength(3);
    expect(response.body.name).toContain('Map');
    expect(response.body.tileMap).toHaveLength(16*16);
  })
});

afterAll(async () => {
  mongoose.connection.close()
});
