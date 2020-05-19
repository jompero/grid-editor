import React from 'react';
import { ListItem, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { redo } from '../../reducers/historyReducer';
import RedoIcon from '@material-ui/icons/Redo';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <IconButton onClick={() => dispatch(redo())}>
            <RedoIcon />
        </IconButton>
    )
}

export default Eraser;