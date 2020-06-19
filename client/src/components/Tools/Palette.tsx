import * as React from 'react';
import { Modal, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '../Grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import Tile from '../Tile';
import { setBrush } from '../../reducers/brushReducer';
import tileSets from '../../services/tileSets';

const useStyles = makeStyles((theme: Theme) => createStyles({
  window: {
    position: 'absolute',
    zIndex: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
  },
  tile: {
    position: 'absolute',
    transition:' all 0.1s ease-in-out',
    zIndex: 0,
    transformOrigin: '50% 50%',
    '&:hover': {
      zIndex: 1,
      cursor: 'pointer',
      transform: 'scale(1.2)',
    },
  }
}));

export interface Props {
  setOpen: Function,
  open: boolean
}

function Palette() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tileSetName = useSelector((state: RootState) => state.tileSet);
  const tileSet = tileSets[tileSetName];
  const mapping = tileSet.mapping;
  const brush = useSelector((state: RootState) => state.tools.brush);

  const [open, setOpen] = React.useState(false);

  function palette(): any {
    return Array(tileSet.tiles).fill(0).map((n: number, index: number) => (
      <div className={classes.tile} style={{ width: tileSet.tileWidth }} key={index} onClick={() => dispatch(setBrush(index))}>
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
            <Grid columns={tileSet.tilesPerRow} rows={tileSet.tilesPerColumn} tileHeight={tileSet.tileHeight} tileWidth={tileSet.tileWidth} scale={32 / tileSet.tileWidth} >
              {palette()}
            </Grid>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Palette;
