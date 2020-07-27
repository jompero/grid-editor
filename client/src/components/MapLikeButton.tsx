import React from 'react';
import { IconButton, Typography, makeStyles, createStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { TileMap } from '../services/mapsService';
import { RootState } from '../store';
import { likeMap, unlikeMap } from '../reducers/mapsReducer';
import { NoUser } from '../services/usersService';

interface Props {
  map: TileMap
}

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

function MapLikeButton({ map }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  if (user === NoUser) return null;

  const liked = user.id && map.likes?.includes(user.id);

  const icon = liked
    ? <FavoriteIcon />
    : <FavoriteBorderIcon />;

  function like() {
    if (!map.id) return;
    if (!liked) {
      dispatch(likeMap(map.id, user.token));
    } else {
      dispatch(unlikeMap(map.id, user.token));
    }
  }

  return (
    <div className={classes.container}>
        <IconButton data-testid='like-icon' onClick={() => like()}>
          {icon}
        </IconButton>
        <Typography>
          {map.likes?.length || 0}
        </Typography>
    </div>
  );
}

export default MapLikeButton;
