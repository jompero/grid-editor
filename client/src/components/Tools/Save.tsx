import React from 'react';
import { Button } from '@material-ui/core';
import { saveMap, TileMap } from '../../services/maps';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
        <Button onClick={() => save()}>
            Save
        </Button>
    )
}

export default Save;