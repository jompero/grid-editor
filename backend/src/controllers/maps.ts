import express from 'express';
import Map from '../models/tileMap';

const router = express.Router();

interface TileMap {
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

        });

});

export default router;
  