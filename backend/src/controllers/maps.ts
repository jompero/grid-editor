import express from 'express';
import Map, { TileMap } from '../models/tileMap';

const router = express.Router();

router.get('/', function(req, res, next) {
    Map.find()
        .then(response => res.send(JSON.stringify(response)));
});

router.post('/', function(req, res, next) {
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

    console.log('saving map', map);
    Map.create(map)
        .then((response) => res.send(response))
        .catch((err) => {
            next(err);
        });

});

router.delete('/:mapId/', function(req, res, next) {
    Map.findByIdAndDelete(req.params.mapId)
        .then(response => res.send(response))
        .catch(err => next(err));
});

router.put('/:mapId/', function(req, res, next) {
    const map: TileMap = req.body;

    console.log('updating map', map);
    let newMap = { ...map };
    delete newMap.id;

    Map.findByIdAndUpdate(
        { _id: map.id }, 
        { ...newMap }, 
        { upsert: true, setDefaultsOnInsert: true, new: true },
        function(err, result) {
            if (err) next(err);
            res.send(result);
        });
});

export default router;
  