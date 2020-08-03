import React from 'react';
import { IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import { saveMap, TileMap } from '../../services/mapsService';
import { RootState } from '../../store';
import { appendMap } from '../../reducers/mapsReducer';
import { updateMap } from '../../reducers/canvasReducer';
import { notify } from '../../reducers/notificationsReducer';
import Debug from '../../utils/Debug';

function Save() {
  const dispatch = useDispatch();
  const tileMap = useSelector((state: RootState) => state.canvas);
  const user = useSelector((state: RootState) => state.user);
  const map: TileMap = { ...tileMap.present };

  function save(): void {
    saveMap(map, user)
      .then((savedMap) => {
        Debug('map saved', savedMap);
        dispatch(updateMap(savedMap));
        dispatch(appendMap(savedMap));
        dispatch(notify('Map saved succesfully', 'success'));
      })
      .catch((error) => {
        Debug(error);
        dispatch(notify('Error occured while saving map', 'error'));
      });
  }

  return (
    <IconButton id='save-button' onClick={() => save()} disabled={!user.token}>
      <SaveIcon />
    </IconButton>
  );
}

export default Save;
