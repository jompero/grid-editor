import express from 'express';
import Map from '../models/tileMap';

const router = express.Router();

interface TileMap {
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
    Map.create(maps[0])
        .then((response: any) => res.send(response))
})

export default router;
  