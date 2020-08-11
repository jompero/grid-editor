"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tileMap_1 = __importDefault(require("../models/tileMap"));
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
router.post('/reset', (req, res, next) => {
    tileMap_1.default.deleteMany({})
        .then(() => {
        user_1.default.deleteMany({})
            .then(() => res.status(204).end());
    })
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
router.post('/user', (req, res, next) => {
    logger_1.default.info('creating test user', req.body);
    user_1.default.create(req.body)
        .then(() => res.status(204).end())
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
router.post('/maps', (req, res, next) => {
    logger_1.default.info('creating test user', req.body);
    user_1.default.findOne({ name: req.body.user.name })
        .then((user) => tileMap_1.default.create(Object.assign(Object.assign({}, req.body), { user }))
        .then(() => res.status(204).end()))
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
exports.default = router;
//# sourceMappingURL=testing.js.map