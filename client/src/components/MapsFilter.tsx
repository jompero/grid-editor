import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField, Theme, Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core';
import { RootState } from '../store';
import { User } from '../services/usersService';
import { TileMap } from '../services/mapsService';
import Debug from '../utils/Debug';
import { setFilter } from '../reducers/mapsFilterReducer';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    background: theme.palette.background.default,
    display: 'flex',
    padding: '2em',
    alignItems: 'stretch',
  },
  searchField: {
    flex: 'auto',
    margin: '1em',
  },
  userFilter: {
    flex: 'auto',
    margin: '1em',
  },
}));

function MapsFilter() {
  const dispatch = useDispatch();
  const maps = useSelector((state: RootState) => state.maps);
  const mapsFilter = useSelector((state: RootState) => state.mapsFilter);
  const classes = useStyles();

  // const [searchValue, setSearchValue] = useState('');
  // const [userFilter, setUserFilter] = useState([] as string[]);

  const users = maps.reduce((usersAcc: User[], map: TileMap) => {
    if (usersAcc.some((foundUser) => foundUser.id === map.user.id)) {
      return usersAcc;
    }
    return usersAcc.concat(map.user);
  }, []);

  function changeUserFilter(value: unknown) {
    Debug('userfilter: ', value);
    // setUserFilter(value as string[]);
    dispatch(setFilter({
      text: mapsFilter.text,
      users: value as string[],
    }));
  }

  function changeTextFilter(value: string) {
    dispatch(setFilter({
      text: value,
      users: mapsFilter.users,
    }));
  }

  return (
      <div className={classes.form} >

        <FormControl fullWidth className={classes.searchField} variant='outlined'>
          <TextField
            label='Map search'
            type='text'
            size='medium'
            variant='outlined'
            value={mapsFilter.text}
            onChange={(event) => changeTextFilter(event.target.value)} />
        </FormControl>

        <FormControl fullWidth className={classes.userFilter} variant='outlined'>
          <InputLabel id='select-tileset-label'>Filter by user</InputLabel>
          <Select
            labelId='select-tileset-label'
            label='Filter by user'
            autoWidth
            multiple value={mapsFilter.users}
            onChange={(event) => changeUserFilter(event.target.value)}>

            {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
            ))}

          </Select>
        </FormControl>

      </div>
  );
}

export default MapsFilter;
