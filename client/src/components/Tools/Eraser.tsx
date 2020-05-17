import React from 'react';
import { Button, ListItem, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setBrush } from '../../reducers/brushReducer';
import { Icon } from '@iconify/react';
import eraserIcon from '@iconify/icons-mdi/eraser';


function Eraser() {
    const dispatch = useDispatch();

    return (
        <div>
            <ListItem button onClick={() => dispatch(setBrush(-1))}>
                <IconButton>
                    <Icon icon={eraserIcon} />
                </IconButton>
            </ListItem>
        </div>
    )
}

export default Eraser;