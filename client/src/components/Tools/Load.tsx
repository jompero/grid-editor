import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Load() {

    return (
        <Button>
            <Link to='/maps'>Load</Link>
        </Button>
    )
}

export default Load;