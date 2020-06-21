import express from 'express';
import Map, { TileMap } from '../models/tileMap';
import { getUser } from '../utils/google-auth';
import { User } from '../models/user';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', function (req, res, next) {
  Map.find()
    .populate('user')
      .then(response => {
        console.log('all maps: ', response);
        res.send(response);
      });
});

router.post('/', getUser, function (req, res, next) {
  const map: TileMap = req.body;

  console.log('processing map')
  if (!map.name) {
    console.log('setting default name');
    map.name = `Map${Math.floor(Math.random() * 1000)}`;
  }

  if (!map.tileMap) {
    console.log('setting empty tiles');
    map.tileMap = new Array(map.width * map.height).fill(-1);
  }

  map.user = req.user as User;

  Map.create(map)
    .then((response) => { 
      console.log('saving map', response);
      return res.send(response)
     })
    .catch((err) => {
      next(err);
    });

});

router.delete('/:mapId/', getUser, function (req, res, next) {
  const user = req.user as User;
  console.log(`User, ${user}, requesting deletion of map ${req.params.mapId}`);
  Map.findOneAndDelete({ id: req.params.mapId, user: new mongoose.Types.ObjectId(user._id) })
    .then(response => {
      if (!response) {
        console.log(`No map deleted: Map ${req.params.mapId} from user ${user._id} not found`);
        res.statusCode = 204;
      } 
      res.send(response);     
    })
    .catch(err => next(err));
});

router.put('/:mapId/', getUser, function (req, res, next) {
  const map: TileMap = req.body;

  let newMap = { ...map };
  delete newMap.id;

  Map.findByIdAndUpdate(
    { _id: map.id },
    {
      name: newMap.name,
      width: newMap.width,
      height: newMap.height,
      tileMap: newMap.tileMap,
      tileSet: newMap.tileSet
    },
    { upsert: true, setDefaultsOnInsert: true, new: true })
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

export default router;
