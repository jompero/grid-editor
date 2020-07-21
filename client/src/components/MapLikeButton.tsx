import React from 'react';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { TileMap } from '../services/mapsService';
import { RootState } from '../store';
import { likeMap } from '../reducers/mapsReducer';
import { NoUser } from '../services/usersService';

interface Props {
  map: TileMap
}

function MapLikeButton({ map }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  if (user === NoUser) return null;

  const icon = user.id && map.likes?.includes(user.id)
    ? <FavoriteIcon />
    : <FavoriteBorderIcon />;

  function like() {
    if (map.id) {
      dispatch(likeMap(map.id, user.token))
    }
  }

  return (
    <div onClick={() => like()}>
        <IconButton data-testid='like-icon'>
          {icon}
        </IconButton>
    </div>
  );
}

export default MapLikeButton;
