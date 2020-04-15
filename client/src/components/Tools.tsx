import React from 'react';
import { Button } from '@material-ui/core';
import { setBrush } from '../reducers/brushReducer';
import { useDispatch } from 'react-redux';

function Tools() {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(setBrush(-1))}>
            Eraser
        </Button>
    )
}

export default Tools;