import mongoose from 'mongoose';
import app from '../app';
import supertest from 'supertest';
import maps, { TileMap } from '../models/tileMap';
import users from '../models/user';

// name: string;
// width: number;
// height: number;
// tileMap: number[];
// tileSet: string;
// user: mongoose.Types.ObjectId;

const user = {
  profile: 'profile',
  profileId: 'asd',
  email: 'asd',
  name: 'Tester123'
}

const testMaps = [
  {
    name: 'testMap1',
    width: 16,
    height: 16,
    tileMap: new Array(16*16).fill(-1),
    tileSet: 'Harbour',
    //user: mongoose.Types.ObjectId(1)
  }
];

const api = supertest(app);

beforeAll(async () => {
  await users.deleteMany({});
  await maps.deleteMany({});
  const map = testMaps[0] as TileMap;
  await users.create(user);
  const newUser = await users.findOne({ profileId: user.profileId });
  await maps.create({ ...map, user: newUser.id });
});

describe('for maps api, ', () => {
  test('maps are returned as json', async () => {
    await api
      .get('/api/maps')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('all created maps are returned', async () => {
    await api
    .get('/api/maps')
    .expect(200)
    .expect('body', (body) => {
      return body.length === 1;
    })
  });
});

afterAll(async () => {
  mongoose.connection.close()
});
