import React from 'react';
import { ListItem, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { redo } from '../../reducers/historyReducer';
import RedoIcon from '@material-ui/icons/Redo';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <div>
            <div onClick={() => dispatch(redo())}>
                <IconButton>
                    <RedoIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Eraser;