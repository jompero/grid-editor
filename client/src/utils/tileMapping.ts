import { TileSet } from "../services/tileSets";
import { Props as TileProps } from "../components/Tile";

export function computeTilesPerRow(tileSet: TileSet): number {
  return Math.floor(tileSet.imageWidth / tileSet.tileWidth);
};

export function computeTilesPerColumn(tileSet: TileSet) {
  return Math.floor(tileSet.imageHeight / tileSet.tileHeight);
};

function getPosY(tileSet: TileSet, tilesPerRow: number, index: number) {
  return Math.floor(index / tilesPerRow) * tileSet.tileHeight;
};

function getPosX(tileSet: TileSet, tilesPerRow: number, index: number) {
  return (index % tilesPerRow) * tileSet.tileWidth;
};

function getPos(tileSet: TileSet, tilesPerRow: number, index: number) {
  return {
    posY: getPosY(tileSet, tilesPerRow, index),
    posX: getPosX(tileSet, tilesPerRow, index)
  };
};

function getTileProps(index: number, tileSet: TileSet): TileProps {
    const tilesPerRow = computeTilesPerRow(tileSet);
    getPos(tileSet, tilesPerRow, index);

    //console.log('tile', index, 'posX', posX, 'posY', posY); 

    return {
      image: tileSet.image,
      posX: getPosX(tileSet, tilesPerRow, index),
      posY: getPosY(tileSet, tilesPerRow, index),
      width: tileSet.tileWidth,
      height: tileSet.tileHeight
    }
};

function getMapping(tileSet: TileSet): TileProps[] {
  return new Array(tileSet.tiles).fill(0).map((n: number, index: number) => {
      return getTileProps(index, tileSet);
    }
  )
};

export default getMapping;