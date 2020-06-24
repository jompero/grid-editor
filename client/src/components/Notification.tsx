import React from 'react';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { RootState } from '../store';
import { resetNotifications } from '../reducers/notificationsReducer';

function Notification() {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  if (!notification.message) return null;

  const handleClose = () => {
    dispatch(resetNotifications());
  };

  const alert = () => <Alert severity={notification.severity}>{notification.message}</Alert>;

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
  );
}

export default Notification;
