import React from 'react';
import { IconButton } from '@material-ui/core';
import { saveMap, TileMap } from '../../services/mapsService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import SaveIcon from '@material-ui/icons/Save';
import { appendMap } from '../../reducers/mapsReducer';
import { updateMap } from '../../reducers/canvasReducer';

function Save() {
  const dispatch = useDispatch();
  const tileMap = useSelector((state: RootState) => state.canvas);
  const token = useSelector((state: RootState) => state.user.token);
  const map: TileMap = { ...tileMap.tileMap, tileMap: tileMap.history[tileMap.current] };

  if (!token) return (null);

  function save(): void {
    saveMap(map)
      .then(savedMap => {
        console.log('map saved', savedMap);
        dispatch(updateMap(savedMap));
        dispatch(appendMap(savedMap));
      });
  }

  return (
    <IconButton onClick={() => save()}>
      <SaveIcon />
    </IconButton>
  )
}

export default Save;