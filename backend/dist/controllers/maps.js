"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tileMap_1 = __importDefault(require("../models/tileMap"));
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    tileMap_1.default.find()
        .then(response => res.send(JSON.stringify(response)));
});
router.post('/', function (req, res, next) {
    const map = req.body;
    console.log('processing map');
    if (!map.name) {
        console.log('setting default name');
        map.name = `Map${Math.floor(Math.random() * 1000)}`;
    }
    if (!map.tileMap) {
        console.log('setting empty tiles');
        map.tileMap = new Array(map.width * map.height).fill(-1);
    }
    console.log('saving map', map);
    tileMap_1.default.create(map)
        .then((response) => res.send(response))
        .catch((err) => {
        next(err);
    });
});
router.delete('/:mapId/', function (req, res, next) {
    tileMap_1.default.findByIdAndDelete(req.params.mapId)
        .then(response => res.send(response))
        .catch(err => next(err));
});
router.put('/:mapId/', function (req, res, next) {
    const map = req.body;
    console.log('updating map', map);
    let newMap = Object.assign({}, map);
    delete newMap.id;
    tileMap_1.default.findByIdAndUpdate({ _id: map.id }, Object.assign({}, newMap), { upsert: true, setDefaultsOnInsert: true, new: true }, function (err, result) {
        if (err)
            next(err);
        res.send(result);
    });
});
exports.default = router;
//# sourceMappingURL=maps.js.map