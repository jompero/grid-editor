import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import Grid from "./Grid";
import Tile from "./Tile";
import Circle from "./Circle";
import Palette from "./Palette";
import { RootState } from "../store";

import image from '../9445.png';
import mapping from '../9445.json';

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

interface Props {
    image?: string,
    mapping?: any,
    children: React.ReactNode
}

export interface Coordinate {
    x: number,
    y: number,
    height: number,
    width: number
  }

function ToolBar({ children }: Props) {
    const dispatch = useDispatch();
    const tiles = useSelector((state: RootState) => state.tileArray.tiles);
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [tile, setTile] = useState(0);

    function palette(): any {
        return mapping.map((coordinate: Coordinate, index: number) => 
            <div key={index} onClick={() => setTile(index)}>
                <Tile image={image} posX={coordinate.x} posY={coordinate.y} />
            </div>);
    }

    return (
        <div>
            <AppBar position='absolute' className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Grid Editor
                </Typography>
                <div onClick={() => setOpen(true)}>
                <Circle>
                    <Grid columns={1} rows={1} tileHeight={14} tileWidth={16} scale={2.5} >
                    <Tile image={image} posX={mapping[tile]['x']} posY={mapping[tile]['y']} />
                    </Grid>
                </Circle>
                </div>
            </Toolbar>
            </AppBar>

            <div className={classes.content}>
                <div className={classes.toolbarMargin} />

                { children }

                <Palette setOpen={setOpen} open={open}>
                    {palette()}
                </Palette>
            </div>
        </div>
    )
}

export default ToolBar;