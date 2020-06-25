import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Grid as MUIGrid, IconButton,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { RootState } from '../store';
import Edit from './Tools/Edit';
import Login from './Login';
import Logout from './Logout';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  content: {
    margin: 'auto',
    marginTop: '1em',
  },
  toolbarMargin: theme.mixins.toolbar,
}));

interface Props {
  image?: string,
  mapping?: any,
  children?: React.ReactNode
}

function TopBar({ children }: Props) {
  const mapName = useSelector((state: RootState) => state.canvas.present.name);
  const user = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const classes = useStyles();

  const canvasName = () => (
      <MUIGrid container alignItems='center' >
        <MUIGrid item >
          <Edit />
        </MUIGrid>
        <MUIGrid item >
          <Typography variant='h6' display='inline' align='justify'>{mapName}</Typography>
        </MUIGrid>
      </MUIGrid>
  );

  return (
    <div className={classes.root}>

      <AppBar color='default' position='absolute' className={classes.appBar}>
        <Toolbar>
          <MUIGrid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >

            <MUIGrid item xs={3} >
              <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
                Grid Editor
              </Typography>
            </MUIGrid>

            <MUIGrid item>

                <Switch>
                  <Route exact path='/login' />

                  <Route exact path='/maps'>
                    <IconButton onClick={() => history.push('/')}>
                      <CancelIcon/>
                    </IconButton>
                  </Route>

                  <Route exact path='/'>
                    {canvasName()}
                  </Route>
                </Switch>

            </MUIGrid>

            <MUIGrid item xs={3} style={{ textAlign: 'right' }}>
              {!user.token && <Login />}
              {user.token && <Logout />}
            </MUIGrid>

          </MUIGrid>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <div className={classes.toolbarMargin} />
        {children}
      </div>

    </div>
  );
}

export default TopBar;
