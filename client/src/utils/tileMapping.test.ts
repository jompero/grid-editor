import '@testing-library/jest-dom/extend-expect';
import getMapping, { computeTilesPerRow, computeTilesPerColumn } from './tileMapping';

const image = {
  image: 'image',
  imageWidth: 32,
  imageHeight: 16,
  tileWidth: 16,
  tileHeight: 16,
  tiles: 2,
};

describe('tileMapping', () => {
  const tilesPerRow = computeTilesPerRow(image.imageWidth, image.tileWidth);

  test('returns correct amount of tile per row ', () => {
    expect(tilesPerRow).toBe(2);
  });

  test('return correct amount of tiles per column', () => {
    const tilesPerColumn = computeTilesPerColumn(image.imageHeight, image.tileHeight);
    expect(tilesPerColumn).toBe(1);
  });

  test('return props', () => {
    const mapping = getMapping(image.image,
      tilesPerRow,
      image.imageHeight,
      image.tileWidth,
      image.tileHeight,
      image.tiles);
    expect(mapping.length).toBe(2);
    expect(mapping[0].image).toBe(image.image);
    expect(mapping[0].height).toBe(image.tileHeight);
    expect(mapping[0].width).toBe(image.tileWidth);
    expect(mapping[0].color).not.toBeDefined();
    expect(mapping[0].posX).toBe(0);
    expect(mapping[0].posY).toBe(0);
    expect(mapping[1].posX).toBe(16);
    expect(mapping[1].posY).toBe(0);
  });
});
