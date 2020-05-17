import React from 'react';
import { ListItem, IconButton } from '@material-ui/core';
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
        <div>
            <ListItem button component={Link} to='/maps'>
                <IconButton onClick={() => save()}>
                    <SaveIcon />
                </IconButton>
            </ListItem>
        </div>
    )
}

export default Save;