import React from 'react';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import RedoIcon from '@material-ui/icons/Redo';
import { ActionCreators } from 'redux-undo';

function Eraser() {
  const dispatch = useDispatch();

  return (
        <IconButton onClick={() => dispatch(ActionCreators.redo())}>
            <RedoIcon data-testid='redo-icon' />
        </IconButton>
  );
}

export default Eraser;
