import * as React from 'react';

export interface Props {
  image: string;
  posX: number;
  posY: number;
}

function Tile({ image, posX, posY }: Props) {

  const style = {
    backgroundImage: `url(${image})`,
    transform: 'scale(2)',
    transformOrigin: 'top left',
    backgroundPosition: `-${posX}px -${posY}px`,
    width: '16px',
    height: '16px',
    margin: '16px'
  }

  return (
    <div>
      <div style={style} />
    </div>
  );
}

export default Tile;
