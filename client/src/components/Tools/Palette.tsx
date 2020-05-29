import * as React from 'react';
import { Modal, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '../Grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import Tile from '../Tile';
import { setBrush } from '../../reducers/brushReducer';
import { computeTilesPerColumn, computeTilesPerRow } from '../../utils/tileMapping';

export interface Coordinate {
  x: number,
  y: number,
  height: number,
  width: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  window: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
  },
}));

export interface Props {
  setOpen: Function,
  open: boolean,
  children: React.ReactNode
}

function Palette() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tileSet = useSelector((state: RootState) => state.tileSet.tileSet);
  const mapping = useSelector((state: RootState) => state.tileSet.tileProps);
  const brush = useSelector((state: RootState) => state.tools.brush);

  const [open, setOpen] = React.useState(false);

  function palette(): any {
    //return mapping.map((coordinate: Coordinate, index: number) => (
    //    <div key={index} onClick={() => dispatch(setBrush(index))}>
    //      <Tile {...getTileProps()} />
    //    </div>
    //));
    return Array(tileSet.tiles).fill(0).map((n: number, index: number) => (
      <div key={index} onClick={() => dispatch(setBrush(index))}>
        <Tile {...mapping[index]} />
      </div>
    ));
  }

  return (
    <div>
      <div id={'selectedBrush'} onClick={() => setOpen(true)}>
        <IconButton>
          <Grid columns={1} rows={1} tileHeight={tileSet.tileHeight} tileWidth={tileSet.tileWidth} scale={24/tileSet.tileWidth} >
            {brush >= 0
            && <Tile {...mapping[brush]} />}
          </Grid>
        </IconButton>
      </div>
      
      <div onClick={() => setOpen(false)}>
        <Modal open={open} onClose={() => setOpen(false)} >
          <div className={classes.window} >
            <Grid columns={computeTilesPerColumn(tileSet)} rows={computeTilesPerRow(tileSet)} tileHeight={tileSet.tileHeight} tileWidth={tileSet.tileWidth} scale={32 / tileSet.tileWidth} >
              {palette()}
            </Grid>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Palette;
