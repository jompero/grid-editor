import React from 'react';
import Eraser from './Eraser';
import Undo from './Undo';
import Redo from './Redo';

function Tools() {
  return (
        <div id='tools'>
            <Eraser />
            <Undo />
            <Redo />
        </div>
  );
}

export default Tools;
