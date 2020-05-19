import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { Modal, makeStyles, Theme, createStyles } from '@material-ui/core';
import Settings from './Settings';

const useStyles = makeStyles((theme: Theme) => createStyles({
  window: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
  },
}));

function Tune() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <TuneIcon />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)} >
        <div className={classes.window} >
          <Settings />
        </div>
      </Modal>
    </div>
  )
}

export default Tune;