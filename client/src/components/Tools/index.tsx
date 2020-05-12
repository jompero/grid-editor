import React from 'react';
import Eraser from './Eraser';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';

function Tools() {
  return (
        <div id='tools'>
            <Eraser />
            <Undo />
            <Redo />
            <Save />
        </div>
  );
}

export default Tools;
