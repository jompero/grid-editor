import cityImage from '../tileSets/revolution_tiles.png';
import caveImage from '../tileSets/bw_tiles.png';

export interface TileSet {
    image: string,
    imageWidth: number,
    imageHeight: number,
    tileWidth: number,
    tileHeight: number,
    tiles: number
}

const Harbour = {
    image: cityImage,
    imageWidth: 64,
    imageHeight: 80,
    tileWidth: 8,
    tileHeight: 8,
    tiles: 78
};

const Cave = {
    image: caveImage,
    imageWidth: 64,
    imageHeight: 56,
    tileWidth: 8,
    tileHeight: 8,
    tiles: 50
}

const tileSets = {
    Harbour,
    Cave
} as {
    [key: string]: TileSet
}

export default tileSets;
