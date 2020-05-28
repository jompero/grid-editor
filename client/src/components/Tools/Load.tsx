import React from 'react';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import StorageIcon from '@material-ui/icons/Storage';

function Load() {
  const history = useHistory();

  return (
    <IconButton onClick={() => history.push('/maps')}>
      <StorageIcon />
    </IconButton>
  );
};

export default Load;