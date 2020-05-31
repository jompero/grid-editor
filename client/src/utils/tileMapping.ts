import { TileSet } from "../services/tileSets";
import { Props as TileProps } from "../components/Tile";

export function computeTilesPerRow(imageWidth: number, tileWidth: number): number {
  return Math.floor(imageWidth / tileWidth);
};

export function computeTilesPerColumn(imageHeight: number, tileHeight: number) {
  return Math.floor(imageHeight / tileHeight);
};

function getPosY(tileHeight: number, tilesPerRow: number, index: number) {
  return Math.floor(index / tilesPerRow) * tileHeight;
};

function getPosX(tileWidth: number, tilesPerRow: number, index: number) {
  return (index % tilesPerRow) * tileWidth;
};

function getPos(tileHeight: number, tileWidth: number, tilesPerRow: number, index: number) {
  return {
    posY: getPosY(tileHeight, tilesPerRow, index),
    posX: getPosX(tileWidth, tilesPerRow, index)
  };
};

function getTileProps(index: number, image: string, tilesPerRow: number, imageHeight: number, tileHeight: number, tileWidth: number): TileProps {
    //console.log('tile', index, 'posX', posX, 'posY', posY); 

    return {
      image: image,
      ...getPos(tileHeight, tileWidth, tilesPerRow, index),
      width: tileWidth,
      height: tileHeight
    }
};

function getMapping(image: string,  tilesPerRow: number, imageHeight: number, tileWidth: number, tileHeight: number, tiles: number): TileProps[] {
  return new Array(tiles).fill(0).map((n: number, index: number) => {
      return getTileProps(index, image, tilesPerRow, imageHeight, tileHeight, tileWidth);
    }
  )
};

export default getMapping;