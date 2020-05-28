import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Grid as MUIGrid, Button, IconButton,
} from '@material-ui/core';
import { RootState } from '../store';
import Edit from './Tools/Edit';
import { Link } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';

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
  },
  toolbarMargin: theme.mixins.toolbar,
}));

interface Props {
  image?: string,
  mapping?: any,
  children?: React.ReactNode
}

function TopBar({ children }: Props) {
  const mapName = useSelector((state: RootState) => state.canvas.tileMap.name);
  const history = useHistory();
  const classes = useStyles();

  const canvasName = () => {
    return (
      <MUIGrid container alignItems='center' >
        <MUIGrid item >
          <Edit />
        </MUIGrid>
        <MUIGrid item >
          <Typography variant='h6' display='inline' align='justify'>{mapName}</Typography>
        </MUIGrid>
      </MUIGrid>
    )
  };

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

            <MUIGrid item alignContent='flex-start' xs={3} >
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

            <MUIGrid item xs={3} justify='flex-end' style={{ textAlign: 'right' }}>
              <Button component={Link} to='/login' >Login</Button>
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
