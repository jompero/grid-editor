"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/', passport_1.default.authenticate('google', { scope: 'https://localhost:3001/api/login' }), function (req, res, next) {
    res.send('respond with a resource');
});
exports.default = router;
//# sourceMappingURL=login.js.map