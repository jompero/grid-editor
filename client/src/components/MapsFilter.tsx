import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import { TextField, Theme, Select, MenuItem } from '@material-ui/core';
import { User } from '../services/usersService';
import { TileMap } from '../services/mapsService';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    background: theme.palette.background.default,
    display: 'grid',
    gridTemplateColumns:'repeat(3, 50em [col-start])',
    gridGap: '2em',
    padding: '2em',
  },
}));

function MapsFilter() {
  const maps = useSelector((state: RootState) => state.maps);
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [mapName, setMapName] = useState('');

  const users = maps.reduce((usersAcc: User[], map: TileMap) => {
    if (usersAcc.some((foundUser) => foundUser.id === map.user.id)) {
      return usersAcc;
    }
    return usersAcc.concat(map.user);
  }, []);

  return (
    <div>
      <div className={classes.form} >
        <TextField label='Search' type='text'  variant='outlined' defaultValue={username} onChange={(event) => setUsername(event.target.value)} />
        <Select multiple value={users} >
          {users.map((user) => {
              return (
                <MenuItem key={user.id} value={user.name}>
                  {user.name}
                </MenuItem>
              )
          })}
        </Select>
      </div>
    </div>
  );
}

export default MapsFilter;
