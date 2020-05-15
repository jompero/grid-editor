import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { undo } from '../../reducers/historyReducer';

function Eraser() {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(undo())}>
            Undo
        </Button>
    )
}

export default Eraser;