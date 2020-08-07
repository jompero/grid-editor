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
const user_1 = __importDefault(require("../src/models/user"));
const userInfo = {
    profile: 'profile',
    profileId: 'asd',
    email: 'asd',
    name: 'Tester123'
};
const api = supertest_1.default(app_1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield user_1.default.create(userInfo);
}));
describe('users api', () => {
    test('returns users as json', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }));
    test('returns one user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api
            .get('/api/users')
            .expect(200);
        expect(response.body).toHaveLength(1);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connection.close();
}));
//# sourceMappingURL=users.test.js.map