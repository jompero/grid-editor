import React from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Grid as MUIGrid,
} from '@material-ui/core';
import { RootState } from '../store';
import Edit from './Tools/Edit';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  title: {
    flexGrow: 1
  },
  mapName: {
    textAlign: 'center',
    background: 'red'
  },
  tool: {
    marginRight: '1em',
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
  const brush = useSelector((state: RootState) => state.tools.brush);
  const mapName = useSelector((state: RootState) => state.canvas.tileMap.name);
  console.log('brush', brush);
  const classes = useStyles();

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
              <Typography variant="h6" className={classes.title}>
                Grid Editor
              </Typography>
            </MUIGrid>

            <MUIGrid item>
              <MUIGrid container alignItems='center' >
                <MUIGrid item >
                  <Edit />
                </MUIGrid>
                <MUIGrid item >
                  <Typography variant='h6' display='inline' align='justify'>{mapName}</Typography>
                </MUIGrid>
              </MUIGrid>
            </MUIGrid>

            <MUIGrid item xs={3} />

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
