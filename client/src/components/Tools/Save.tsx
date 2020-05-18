import React from 'react';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { saveMap, TileMap } from '../../services/maps';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import SaveIcon from '@material-ui/icons/Save';
import { appendMap } from '../../reducers/mapsReducer';

function Save() {
    const dispatch = useDispatch();
    const tileMap = useSelector((state: RootState) => state.history);
    const map: TileMap = { ...tileMap.tileMap, tileMap: tileMap.history[tileMap.current] };

    function save(): void {
        saveMap(map)
            .then(response => {
                console.log('map saved');
                dispatch(appendMap(response.data));
            });
    }

    return (
        <Link to='/maps'>
            <IconButton onClick={() => save()}>
                <SaveIcon />
            </IconButton>
        </Link>
    )
}

export default Save;