import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { redo } from '../../reducers/tileArrayReducer';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(redo())}>
            Redo
        </Button>
    )
}

export default Eraser;