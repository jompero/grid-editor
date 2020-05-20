import React from 'react';
import { Button, ListItem, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { undo } from '../../reducers/canvasReducer';
import UndoIcon from '@material-ui/icons/Undo';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(undo())}>
            <IconButton>
                <UndoIcon />
            </IconButton>
        </div>
    )
}

export default Eraser;