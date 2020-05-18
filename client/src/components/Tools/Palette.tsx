import * as React from 'react';
import { Modal, ListItem, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '../Grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import Circle from '../Circle';
import Tile from '../Tile';
import mapping from '../../9445.json';
import { setBrush } from '../../reducers/brushReducer';

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
  const image = useSelector((state: RootState) => state.tileSet);
  const brush = useSelector((state: RootState) => state.tools.brush);

  const [open, setOpen] = React.useState(false);

  function palette(): any {
    return mapping.map((coordinate: Coordinate, index: number) => (
        <div key={index} onClick={() => dispatch(setBrush(index))}>
          <Tile image={image} posX={coordinate.x} posY={coordinate.y} />
        </div>
    ));
  }

  return (
    <div>
      <div id={'selectedBrush'} onClick={() => setOpen(true)}>
        <IconButton>
          <Grid columns={1} rows={1} tileHeight={14} tileWidth={16} scale={1.5} >
            {brush >= 0
            && <Tile image={image} posX={mapping[brush].x} posY={mapping[brush].y} />}
          </Grid>
        </IconButton>
      </div>
      
      <div onClick={() => setOpen(false)}>
        <Modal open={open} onClose={() => setOpen(false)} >
          <div className={classes.window} >
            <Grid columns={24} rows={19} tileHeight={17} tileWidth={17} scale={2} >
              {palette()}
            </Grid>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Palette;
