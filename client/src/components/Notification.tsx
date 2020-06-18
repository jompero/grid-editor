import React from 'react';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { resetNotifications } from '../reducers/notificationsReducer';
import { Alert } from '@material-ui/lab';

function Notification() {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  if (!notification.message) return null;

  const handleClose = () => { 
    dispatch(resetNotifications());
  };

  const alert = () => {
    return <Alert severity={notification.severity}>{notification.message}</Alert>
  }

  return (
    <Snackbar   
      open={true}
      onClose={handleClose}
      autoHideDuration={6000}
      message={notification.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      {notification.severity && alert()}
    </Snackbar>
  )
}

export default Notification;