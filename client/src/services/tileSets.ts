import cityImage from '../tileSets/revolution_tiles.png'

export interface TileSet {
    image: string,
    imageWidth: number,
    imageHeight: number,
    tileWidth: number,
    tileHeight: number,
    tiles: number
}

const City = {
    image: cityImage,
    imageWidth: 64,
    imageHeight: 48,
    tileWidth: 8,
    tileHeight: 8,
    tiles: 26
}

const tileSets = {
    City
} as {
    [key: string]: TileSet
}

export default tileSets;
