import express from 'express';
import mongoose from 'mongoose';
import logger from '../utils/logger';
import Map, { TileMap } from '../models/tileMap';
import { getUser } from '../utils/google-auth';
import { User } from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  Map.find()
    .populate('user')
    .then((response) => {
      logger.info('all maps: ', response);
      res.send(response);
    });
});

router.post('/', getUser, (req, res, next) => {
  const map: TileMap = req.body;

  logger.info('processing map uploaded map: ', req.body);
  if (!map.name) {
    logger.info('setting default name');
    map.name = `Map${Math.floor(Math.random() * 1000)}`;
  }

  if (!map.tileMap) {
    logger.info('setting empty tiles array');
    map.tileMap = new Array(map.width * map.height).fill(-1);
  }

  map.user = mongoose.Types.ObjectId(req.user._id);

  Map.create(map)
    .then((response) => {
      logger.info('saving map: ', response);
      return res.send(response);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
});

router.delete('/:mapId/', getUser, (req, res, next) => {
  const user = req.user as User;
  logger.info(`User, ${user}, requesting deletion of map ${req.params.mapId}`);
  Map.findById(req.params.mapId)
    .then((response) => {
      logger.info('Response', response);
      if (response && (response as TileMap).user.equals(user._id)) {
        response.remove();
        logger.info(`Map deleted: Map ${req.params.mapId} from user ${user._id}.`, 'Response:', response);
        res.send(response);
      } else {
        logger.info(`No map deleted: Map ${req.params.mapId} from user ${user._id} not found.`, 'Response:', response);
        res.statusCode = 204;
        res.send();
      }
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
});

router.put('/:mapId/', getUser, (req, res, next) => {
  const map: TileMap = req.body;

  const newMap = { ...map };
  delete newMap.id;

  Map.findByIdAndUpdate(
    { _id: map.id },
    {
      name: newMap.name,
      width: newMap.width,
      height: newMap.height,
      tileMap: newMap.tileMap,
      tileSet: newMap.tileSet,
    },
    { upsert: true, setDefaultsOnInsert: true, new: true },
  )
    .populate('user')
    .then((result) => {
      logger.info('updated map: ', map);
      res.send(result);
    })
    .catch((err) => {
      logger.error('error while saving map: ', err);
      next(err);
    });
});

router.post('/:mapId/like/', getUser, (req, res, next) => {
  Map.findByIdAndUpdate(
    { _id: req.params.mapId },
    {
      $addToSet: { likes: req.user }
    },
    { new: true },
  )
    .populate('user')
    .then((result) => {
      logger.info('liked map: ', result);
      res.send(result);
    })
    .catch((err) => {
      logger.error('error while liking map: ', err);
      next(err);
    });
});

router.post('/:mapId/unlike/', getUser, (req, res, next) => {
  Map.findByIdAndUpdate(
    { _id: req.params.mapId },
    {
      $pull: { likes: req.user.id }
    },
    { new: true },
  )
    .populate('user')
    .then((result) => {
      logger.info('unliked map: ', result);
      res.send(result);
    })
    .catch((err) => {
      logger.error('error while unliking map: ', err);
      next(err);
    });
});

export default router;
