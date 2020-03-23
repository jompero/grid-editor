import * as React from 'react';
import { Drawer } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from './Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbarMargin: theme.mixins.toolbar,
    })
);

export interface Props {
    setOpen: Function,
    open: boolean,
    children: React.ReactNode
}

function Palette({ setOpen, open, children }: Props) {
    const classes = useStyles();

    return (
        <div onClick={() => setOpen(false)}>
            <Drawer variant='permanent' anchor="right" open={open} onClose={() => setOpen(false)} >
                <div className={classes.toolbarMargin} />
                <Grid columns={10} rows={50} tileHeight={17} tileWidth={17} scale={2} >
                    {children}
                </Grid>
            </Drawer>
        </div>
    );
}

export default Palette;
