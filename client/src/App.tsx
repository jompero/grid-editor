import * as React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from './components/Grid'
import Tile from './components/Tile';
import Palette from './components/Palette';
import Canvas from './components/Canvas';
import Circle from './components/Circle';
import ToolBar from './components/ToolBar';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      //width: 300,
      flexShrink: 0,
    },
    title: {
      flexGrow: 1,
    },
    content: {
      margin: 'auto'
    },
    toolbarMargin: theme.mixins.toolbar,
  })
);

function App() {

  const classes = useStyles();

  return (
    <div>
      <ToolBar>
        <Canvas width = {16} height = {16} tileHeight = {16} tileWidth = {16} />
      </ToolBar>

    </div>
  );
}

export default App;