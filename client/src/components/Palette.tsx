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
                <Grid columns={10} rows={50} tileHeight={17} tileWidth={17} scale={2} >
                    {children}
                </Grid>
            </Drawer>
        </div>
    );
}

export default Palette;