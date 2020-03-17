import * as React from 'react';
import { Drawer } from '@material-ui/core';
import Grid from './Grid';

export interface Props {
    setOpen: Function,
    open: boolean,
    children: React.ReactNode
}

function Palette({ setOpen, open, children }: Props) {
    return (
        <div onClick={() => setOpen(false)}>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)} >
                <Grid columns={24} rows={50} tileHeight={16} tileWidth={16} scale={3} >
                    {children}
                </Grid>
            </Drawer>
        </div>
    );
}

export default Palette;
