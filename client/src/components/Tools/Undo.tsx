import React from 'react';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import UndoIcon from '@material-ui/icons/Undo';
import { ActionCreators } from 'redux-undo';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(ActionCreators.undo())}>
            <IconButton>
                <UndoIcon />
            </IconButton>
        </div>
    )
}

export default Eraser;