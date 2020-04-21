import * as React from 'react';
import { Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from './Grid';

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

function Palette({ setOpen, open, children }: Props) {
  const classes = useStyles();

  return (
        <div onClick={() => setOpen(false)}>
            <Modal open={open} onClose={() => setOpen(false)} >
                <div className={classes.window} >
                    <Grid columns={24} rows={19} tileHeight={17} tileWidth={17} scale={2} >
                        {children}
                    </Grid>
                </div>
            </Modal>
        </div>
  );
}

export default Palette;
