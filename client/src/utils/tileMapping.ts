import { TileSet } from "../services/tileSets";


function getTileProps(index: number, tileSet: TileSet) {
    const tilesPerRow = tileSet.imageWidth / tileSet.tileWidth;
    const posX = tilesPerRow % index * tileSet.tileWidth;
    const posY = Math.floor(tilesPerRow / index);

    return {
      image: tileSet.image,
      posX, posY
    }
}

export default getTileProps;