import React from 'react';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StorageIcon from '@material-ui/icons/Storage';

function Load() {

    return (
        <Link to='/maps'>
            <IconButton>
                <StorageIcon />
            </IconButton>
        </Link>
    );
};

export default Load;