"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tileMap_1 = __importDefault(require("../models/tileMap"));
const google_auth_1 = require("../utils/google-auth");
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    tileMap_1.default.find()
        .populate('user')
        .then(response => {
        console.log('all maps: ', response);
        res.send(JSON.stringify(response));
    });
});
router.post('/', google_auth_1.getUser, function (req, res, next) {
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
    map.user = req.user;
    tileMap_1.default.create(map)
        .then((response) => {
        console.log('saving map', response);
        return res.send(response);
    })
        .catch((err) => {
        next(err);
    });
});
router.delete('/:mapId/', function (req, res, next) {
    tileMap_1.default.findByIdAndDelete(req.params.mapId)
        .then(response => res.send(response))
        .catch(err => next(err));
});
router.put('/:mapId/', google_auth_1.getUser, function (req, res, next) {
    const map = req.body;
    let newMap = Object.assign({}, map);
    delete newMap.id;
    tileMap_1.default.findByIdAndUpdate({ _id: map.id }, {
        name: newMap.name,
        width: newMap.width,
        height: newMap.height,
        tileMap: newMap.tileMap,
        tileSet: newMap.tileSet
    }, { upsert: true, setDefaultsOnInsert: true, new: true })
        .populate('user')
        .then((result) => {
        console.log('updated map', map);
        res.send(result);
    })
        .catch((err) => {
        console.log('error while saving map', err);
        next(err);
    });
});
exports.default = router;
//# sourceMappingURL=maps.js.map