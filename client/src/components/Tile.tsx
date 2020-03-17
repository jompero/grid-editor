import * as React from 'react';

export interface Props {
  image: string;
  posX: number;
  posY: number;
}

function Tile({ image, posX, posY }: Props) {

  const style = {
    backgroundImage: `url(${image})`,
    backgroundPosition: `-${posX}px -${posY}px`,
    width: '16px',
    height: '16px'
  }

  return (
    <div style={style} />
  );
}

export default Tile;
