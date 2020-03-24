import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        circle: {
            transform: 'scale(1.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'white',
            borderRadius: '50%'
        },
        content: {
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
        }
    })
);

interface Props {
    children: any
}

function Circle({children}: Props) {
    const classes = useStyles(); 

    return (
        <div className={classes.circle}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default Circle;