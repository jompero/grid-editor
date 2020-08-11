"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const tileMap_1 = __importDefault(require("../models/tileMap"));
const google_auth_1 = require("../utils/google-auth");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    tileMap_1.default.find()
        .populate('user')
        .then((response) => {
        logger_1.default.info('all maps: ', response);
        res.send(response);
    })
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
router.post('/', google_auth_1.getUser, (req, res, next) => {
    const map = req.body;
    logger_1.default.info('processing map uploaded map: ', req.body);
    if (!map.name) {
        logger_1.default.info('setting default name');
        map.name = `Map${Math.floor(Math.random() * 1000)}`;
    }
    if (!map.tileMap) {
        logger_1.default.info('setting empty tiles array');
        map.tileMap = new Array(map.width * map.height).fill(-1);
    }
    map.user = mongoose_1.default.Types.ObjectId(req.user._id);
    map.likes = [];
    tileMap_1.default.create(map)
        .then((response) => {
        logger_1.default.info('saving map: ', response);
        return res.send(response);
    })
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
router.delete('/:mapId/', google_auth_1.getUser, (req, res, next) => {
    const user = req.user;
    logger_1.default.info(`User, ${user}, requesting deletion of map ${req.params.mapId}`);
    tileMap_1.default.findById(req.params.mapId)
        .then((response) => {
        logger_1.default.info('Response', response);
        if (response && response.user.equals(user._id)) {
            response.remove();
            logger_1.default.info(`Map deleted: Map ${req.params.mapId} from user ${user._id}.`, 'Response:', response);
            res.send(response);
        }
        else {
            logger_1.default.info(`No map deleted: Map ${req.params.mapId} from user ${user._id} not found.`, 'Response:', response);
            res.statusCode = 204;
            res.send();
        }
    })
        .catch((err) => {
        logger_1.default.error(err);
        next(err);
    });
});
router.put('/:mapId/', google_auth_1.getUser, (req, res, next) => {
    const map = req.body;
    const newMap = Object.assign({}, map);
    delete newMap.id;
    tileMap_1.default.findOneAndUpdate({ _id: map.id, user: req.user.id }, {
        name: newMap.name,
        width: newMap.width,
        height: newMap.height,
        tileMap: newMap.tileMap,
        tileSet: newMap.tileSet,
    }, { upsert: true, setDefaultsOnInsert: true, new: true })
        .populate('user')
        .then((result) => {
        logger_1.default.info('updated map: ', map);
        res.send(result);
    })
        .catch((err) => {
        logger_1.default.error('error while saving map: ', err);
        next(err);
    });
});
router.post('/:mapId/like/', google_auth_1.getUser, (req, res, next) => {
    tileMap_1.default.findByIdAndUpdate({ _id: req.params.mapId }, {
        $addToSet: { likes: req.user },
    }, { new: true })
        .populate('user')
        .then((result) => {
        logger_1.default.info('liked map: ', result);
        res.send(result);
    })
        .catch((err) => {
        logger_1.default.error('error while liking map: ', err);
        next(err);
    });
});
router.post('/:mapId/unlike/', google_auth_1.getUser, (req, res, next) => {
    tileMap_1.default.findByIdAndUpdate({ _id: req.params.mapId }, {
        $pull: { likes: req.user.id },
    }, { new: true })
        .populate('user')
        .then((result) => {
        logger_1.default.info('unliked map: ', result);
        res.send(result);
    })
        .catch((err) => {
        logger_1.default.error('error while unliking map: ', err);
        next(err);
    });
});
exports.default = router;
//# sourceMappingURL=maps.js.map