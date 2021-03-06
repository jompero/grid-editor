import cityImage from '../tileSets/revolution_tiles.png';
import caveImage from '../tileSets/bw_tiles.png';
import amareloImage from '../tileSets/amarelo.png';
import { Props as TileProps } from '../components/Tile';
import getMapping, { computeTilesPerRow } from '../utils/tileMapping';

export interface TileSet {
  name: string,
  image: string,
  imageWidth: number,
  imageHeight: number,
  tileWidth: number,
  tileHeight: number,
  tiles: number,
  tilesPerRow: number,
  tilesPerColumn: number,
  mapping: TileProps[]
}

const Harbour: TileSet = {
  name: 'City',
  image: cityImage,
  imageWidth: 64,
  imageHeight: 80,
  tileWidth: 8,
  tileHeight: 8,
  tiles: 78,
  tilesPerRow: 0,
  tilesPerColumn: 0,
  mapping: [],
};

Harbour.tilesPerRow = computeTilesPerRow(Harbour.imageWidth, Harbour.tileWidth);
Harbour.tilesPerColumn = computeTilesPerRow(Harbour.imageHeight, Harbour.tileHeight);
Harbour.mapping = getMapping(
  Harbour.image,
  Harbour.tilesPerRow,
  Harbour.imageHeight,
  Harbour.tileWidth,
  Harbour.tileHeight,
  Harbour.tiles,
);

const Cave: TileSet = {
  name: 'Cave',
  image: caveImage,
  imageWidth: 64,
  imageHeight: 56,
  tileWidth: 8,
  tileHeight: 8,
  tiles: 50,
  tilesPerRow: 0,
  tilesPerColumn: 0,
  mapping: [],
};

Cave.tilesPerRow = computeTilesPerRow(Cave.imageWidth, Cave.tileWidth);
Cave.tilesPerColumn = computeTilesPerRow(Cave.imageHeight, Cave.tileHeight);
Cave.mapping = getMapping(
  Cave.image,
  Cave.tilesPerRow,
  Cave.imageHeight,
  Cave.tileWidth,
  Cave.tileHeight,
  Cave.tiles,
);

const Amarelo: TileSet = {
  name: 'Amarelo',
  image: amareloImage,
  imageWidth: 64,
  imageHeight: 88,
  tileWidth: 8,
  tileHeight: 8,
  tiles: 81,
  tilesPerRow: 0,
  tilesPerColumn: 0,
  mapping: [],
};

Amarelo.tilesPerRow = computeTilesPerRow(Amarelo.imageWidth, Amarelo.tileWidth);
Amarelo.tilesPerColumn = computeTilesPerRow(Amarelo.imageHeight, Amarelo.tileHeight);
Amarelo.mapping = getMapping(
  Amarelo.image,
  Amarelo.tilesPerRow,
  Amarelo.imageHeight,
  Amarelo.tileWidth,
  Amarelo.tileHeight,
  Amarelo.tiles,
);

const tileSets = {
  Harbour,
  Cave,
  Amarelo
} as {
  [key: string]: TileSet
};

export default tileSets;
