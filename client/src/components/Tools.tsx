import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setBrush } from '../reducers/brushReducer';
import { undo, redo } from '../reducers/tileArrayReducer';

function Tools() {
  const dispatch = useDispatch();

  return (
        <div id='tools'>
            <Button onClick={() => dispatch(setBrush(-1))}>
                Eraser
            </Button>
            <Button onClick={() => dispatch(undo())}>
                Undo
            </Button>
            <Button onClick={() => dispatch(redo())}>
                Redo
            </Button>
        </div>

  );
}

export default Tools;
