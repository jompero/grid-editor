import React, { useState } from 'react';
import { IconButton, Typography, Grid as MUIGrid } from '@material-ui/core';
import { Modal, makeStyles, Theme, createStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Settings from './Settings';

const useStyles = makeStyles((theme: Theme) => createStyles({
  window: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
  }
}));

function Edit() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)} >
        <div className={classes.window} >
          <Settings />
        </div>
      </Modal>
    </div>
  )
}

export default Edit;