import { TileSet } from "../services/tileSets";

interface Map {
  posY: number,
  posX: number
}

interface Mapping {
  tileSet: TileSet;
  tilesPerRow: number;
  mapping: Map[];
}

let tileMapping: Mapping;

export function computeTilesPerRow(tileSet: TileSet): number {
  if (tileMapping && tileMapping.tileSet === tileSet) return tileMapping.tilesPerRow;
  const tilesPerRow = Math.floor(tileSet.imageWidth / tileSet.tileWidth);
  tileMapping = { tileSet, tilesPerRow, mapping: [] };
  return tilesPerRow;
}

export function computeTilesPerColumn(tileSet: TileSet) {
  return Math.floor(tileSet.imageHeight / tileSet.tileHeight);
}

function getPosY(index: number) {
  const posY = Math.floor(index / tileMapping.tilesPerRow) * tileMapping.tileSet.tileHeight;
  return posY;
};

function getPosX(index: number) {
  const posX = (index % tileMapping.tilesPerRow) * tileMapping.tileSet.tileWidth;
  return posX;
}

function getPos(index: number) {
  if (tileMapping.mapping[index]) return tileMapping.mapping[index];
  tileMapping.mapping[index] = {
    posY: getPosY(index),
    posX: getPosX(index),
  };
  return tileMapping.mapping[index];
}

function getTileProps(index: number, tileSet: TileSet) {
    computeTilesPerRow(tileSet);
    getPos(index);

    //console.log('tile', index, 'posX', posX, 'posY', posY);

    return {
      image: tileSet.image,
      posX: tileMapping.mapping[index].posX,
      posY: tileMapping.mapping[index].posY,
      width: tileSet.tileWidth,
      height: tileSet.tileHeight
    }
}

export default getTileProps;