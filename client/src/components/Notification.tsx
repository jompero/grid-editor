import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { reset } from '../reducers/notificationsReducer';
import { Alert } from '@material-ui/lab';

function Notification() {
  const notification = useSelector((state: RootState) => state.notification);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  if (!notification.message) return null;

  const handleClose = () => { 
    //setOpen(false);
    dispatch(reset());
  };

  return (
    <Snackbar   
      open={true}
      onClose={handleClose}
      autoHideDuration={5000}
      message={notification.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity={notification.severity}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification;