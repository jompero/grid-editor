export default class TileArray {
  empty: number = 0;

  width: number;

  height: number;

  tiles: Array<number>;

  constructor(tiles: Array<number>, width?: number, height?: number) {
    this.tiles = tiles;
    this.width = width || 16;
    this.height = height || 16;
  }
}
