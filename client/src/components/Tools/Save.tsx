import React from 'react';
import { IconButton } from '@material-ui/core';
import { saveMap, TileMap } from '../../services/mapsService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import SaveIcon from '@material-ui/icons/Save';
import { appendMap } from '../../reducers/mapsReducer';
import { updateMap } from '../../reducers/canvasReducer';
import { notify } from '../../reducers/notificationsReducer';

function Save() {
  const dispatch = useDispatch();
  const tileMap = useSelector((state: RootState) => state.canvas);
  const token = useSelector((state: RootState) => state.user.token);
  const map: TileMap = { ...tileMap.present  };

  function save(): void {
    token && saveMap(map, token)
      .then(savedMap => {
        console.log('map saved', savedMap);
        dispatch(updateMap(savedMap));
        dispatch(appendMap(savedMap));
        dispatch(notify('Map saved succesfully', 'success'));
      })
      .catch((error) => {
        console.log(error);
        dispatch(notify('Error occured while saving map', 'error'));
      });
  }

  return (
    <IconButton onClick={() => save()} disabled={!token}>
      <SaveIcon />
    </IconButton>
  )
}

export default Save;