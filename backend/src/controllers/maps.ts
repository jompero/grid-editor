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

  map.user = mongoose.Types.ObjectId(req.user._id);

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
  Map.findById(req.params.mapId)
    .then(response => {
      console.log('Response', response);
      if (response && (response as TileMap).user.equals(user._id)) {
        response.remove();
        console.log(`Map deleted: Map ${req.params.mapId} from user ${user._id}.`, 'Response:', response);
        res.send(response); 
      } else {
        console.log(`No map deleted: Map ${req.params.mapId} from user ${user._id} not found.`, 'Response:', response);
        res.statusCode = 204;
        res.send();
      }
    
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
