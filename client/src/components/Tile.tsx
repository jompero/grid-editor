import * as React from 'react';

export interface Props {
  image?: string;
  color?: string;
  posX?: number;
  posY?: number;
}

function Tile({ image, color, posX, posY }: Props) {

  const style = {
    backgroundImage: image && `url(${image})`,
    backgroundColor: `${color}`,
    backgroundPosition: posX && posY && `-${posX}px -${posY}px`,
    width: '16px',
    height: '16px'
  }

  return (
    <div style={style} />
  );
}

export default Tile;
