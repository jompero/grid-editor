import React from 'react';
import Eraser from './Eraser';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import Load from './Load';

function Tools() {
  return (
        <div id='tools'>
            <Eraser />
            <Undo />
            <Redo />
            <Save />
            <Load />
        </div>
  );
}

export default Tools;
