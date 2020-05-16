import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Load() {

    return (
        <Button component={Link}  to='/maps'>
            Load
        </Button>
    )
}

export default Load;