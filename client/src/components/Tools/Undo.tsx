import React from 'react';
import { Button, ListItem, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { undo } from '../../reducers/historyReducer';
import UndoIcon from '@material-ui/icons/Undo';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <div>
            <ListItem button onClick={() => dispatch(undo())}>
                <IconButton>
                    <UndoIcon />
                </IconButton>
            </ListItem>
        </div>
    )
}

export default Eraser;