"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tileMap_1 = __importDefault(require("../models/tileMap"));
const router = express_1.default.Router();
const maps = [
    { name: 'yksi', width: 16, height: 16, tileMap: new Array(16 * 16).fill(0) },
    { name: 'kaksi', height: 16, tileMap: new Array(16 * 16).fill(1) },
    { name: 'kolme', height: 16, tileMap: new Array(16 * 16).fill(2) },
];
router.get('/', function (req, res, next) {
    tileMap_1.default.find()
        .then(response => res.send(JSON.stringify(response)));
});
router.post('/', function (req, res, next) {
    tileMap_1.default.create(maps[0])
        .then((response) => res.send(response));
});
exports.default = router;
//# sourceMappingURL=tileMaps.js.map