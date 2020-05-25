import tileSets, { TileSet } from "../services/tileSets";

export function computeTilesPerRow(tileSet: TileSet): number {
  return Math.floor(tileSet.imageWidth / tileSet.tileWidth);
}

export function computeTilesPerColumn(tileSet: TileSet): number {
  return Math.floor(tileSet.imageHeight / tileSet.tileHeight);
}

function getTileProps(index: number, tileSet: TileSet) {
    const tilesPerRow: number = computeTilesPerRow(tileSet);
    const posY = Math.floor(index / tilesPerRow) * tileSet.tileHeight;
    const posX = (index % tilesPerRow) * tileSet.tileWidth;

    console.log('tile', index, 'posX', posX, 'posY', posY);

    return {
      image: tileSet.image,
      posX,
      posY,
      width: tileSet.tileWidth,
      height: tileSet.tileHeight
    }
}

export default getTileProps;