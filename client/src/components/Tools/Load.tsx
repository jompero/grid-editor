import React from 'react';
import { ListItem, Box, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StorageIcon from '@material-ui/icons/Storage';

function Load() {

    return (
        <div>
            <ListItem button component={Link} to='/maps'>
                <IconButton>
                    <StorageIcon />
                </IconButton>
            </ListItem>
        </div>
    );
};

export default Load;