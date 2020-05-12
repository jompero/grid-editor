import React from 'react';
import { Button } from '@material-ui/core';
import { saveMap, TileMap } from '../../services/maps';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Save() {
    const tileArray = useSelector((state: RootState) => state.tileArray);
    const tileMap = tileArray.history[tileArray.current];
    const map: TileMap = {
        name: 'tilemapname1',
        width: tileMap.width,
        height: tileMap.height,
        tileMap: tileMap.tiles
    }

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