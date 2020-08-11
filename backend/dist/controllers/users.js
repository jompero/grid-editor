"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const google_auth_1 = require("../utils/google-auth");
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    user_1.default.find({})
        .then((response) => res.send(response))
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
router.post('/login', google_auth_1.getUser, (req, res) => {
    res.send(req.user);
});
exports.default = router;
//# sourceMappingURL=users.js.map