import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setBrush } from '../../reducers/brushReducer';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(setBrush(-1))}>
            Eraser
        </Button>
    )
}

export default Eraser;