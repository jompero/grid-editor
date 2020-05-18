import React from 'react';
import { ListItem, IconButton, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { saveMap, TileMap } from '../../services/maps';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SaveIcon from '@material-ui/icons/Save';

function Save() {
    const tileMap = useSelector((state: RootState) => state.history);
    const map: TileMap = tileMap.tileMap

    function save(): void {
        saveMap(map)
            .then(response => {
                console.log('map saved');
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