import React from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles, Theme, createStyles, Drawer,
} from '@material-ui/core';
import Tools from './Tools';
import { RootState } from '../store';
import Debug from '../utils/Debug';

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

function ToolBar({ children }: Props) {
  const brush = useSelector((state: RootState) => state.tools.brush);
  Debug('brush', brush);
  const classes = useStyles();

  return (
        <div className={classes.root}>

            <div className={classes.content}>

                <Drawer variant="permanent">
                  <div className={classes.toolbarMargin} />
                  <Tools />
                </Drawer>

                <div className={classes.content}>
                  {children}
                </div>
            </div>

        </div>
  );
}

export default ToolBar;
