"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const maps = [
    { width: 4, height: 4, tileMap: new Array(16).fill(0) },
    { width: 4, height: 4, tileMap: new Array(16).fill(1) },
    { width: 4, height: 4, tileMap: new Array(16).fill(2) },
];
router.get('/maps/', function (req, res, next) {
    res.send(maps);
});
exports.default = router;
//# sourceMappingURL=maps.js.map