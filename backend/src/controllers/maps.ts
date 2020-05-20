import express from 'express';
import Map from '../models/tileMap';

const router = express.Router();

interface TileMap {
    id?: string,
    name: string,
    width: number,
    height: number,
    tileMap: number[]
}

const maps = [
    { name: 'yksi', width: 16, height: 16, tileMap: new Array(16*16).fill(0) },
    { name: 'kaksi', height: 16, tileMap: new Array(16*16).fill(1) },
    { name: 'kolme', height: 16, tileMap: new Array(16*16).fill(2) },
];

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
        .then((response: any) => res.send(response))
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
        { upsert: true, setDefaultsOnInsert: true },
        function(err, result) {
            if (err) next(err);
            res.send(result);
        });
});

export default router;
  