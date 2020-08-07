"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const tileMap_1 = __importDefault(require("../src/models/tileMap"));
const user_1 = __importDefault(require("../src/models/user"));
const userInfo = {
    profile: 'profile',
    profileId: 'asd',
    email: 'asd',
    name: 'Tester123'
};
let user;
const testMaps = [
    {
        name: 'testMap1',
        width: 16,
        height: 16,
        tileMap: new Array(16 * 16).fill(-1),
        tileSet: 'Harbour',
    },
    {
        name: 'testMap2',
        width: 16,
        height: 16,
        tileMap: new Array(16 * 16).fill(-1),
        tileSet: 'Harbour',
    },
    {
        width: 16,
        height: 16,
        tileSet: 'Harbour',
    }
];
const api = supertest_1.default(app_1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield tileMap_1.default.deleteMany({});
    yield user_1.default.create(userInfo);
    user = yield user_1.default.findOne({ profileId: userInfo.profileId });
    yield tileMap_1.default.create(Object.assign(Object.assign({}, testMaps[0]), { user: user.id }));
    yield tileMap_1.default.create(Object.assign(Object.assign({}, testMaps[1]), { user: user.id }));
}));
describe('maps api', () => {
    test('returns maps as json', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .get('/api/maps')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }));
    test('returns two maps', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api
            .get('/api/maps')
            .expect(200);
        expect(response.body).toHaveLength(2);
    }));
    test('assigns user correctly to a saved map', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api
            .get('/api/maps')
            .expect(200);
        expect(response.body[0].user.name).toBe('Tester123');
    }));
    test('fills in name and an empty tilemap if missing', () => __awaiter(void 0, void 0, void 0, function* () {
        //await maps.create({ ...testMaps[2], user: user.id });
        const response = yield api
            .post('/api/maps')
            .send(Object.assign(Object.assign({}, testMaps[2]), { user: user.id }))
            .expect(200);
        //expect(response.body).toHaveLength(3);
        expect(response.body.name).toContain('Map');
        expect(response.body.tileMap).toHaveLength(16 * 16);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connection.close();
}));
//# sourceMappingURL=maps.test.js.map