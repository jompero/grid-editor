import React from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Drawer,
} from '@material-ui/core';
import Tools from './Tools';
import { RootState } from '../store';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    // width: 300,
    flexShrink: 0,
  },
  title: {
    flexGrow: 1,
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
  console.log('brush', brush);
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Grid Editor
          </Typography>
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
