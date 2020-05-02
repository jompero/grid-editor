import express from 'express';
const router = express.Router();

interface TileMap {
    width: number,
    height: number,
    tileMap: number[]
}

const maps = [
    { width: 4, height: 4, tileMap: new Array(16).fill(0) },
    { width: 4, height: 4, tileMap: new Array(16).fill(1) },
    { width: 4, height: 4, tileMap: new Array(16).fill(2) },
];

router.get('/maps/', function(req, res, next) {
    res.send(maps);
});

export default router;
  