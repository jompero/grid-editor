import * as React from 'react';
import Grid from './Grid';

export interface Props {
    width: number,
    height: number,
    tileHeight?: number,
    tileWidth?: number,
    children: React.ReactNode
}

function TileMap({ width, height, tileHeight, tileWidth, children }: Props) {
    return (
        <Grid columns={width} rows={height} tileHeight={tileHeight ? tileHeight : 16} tileWidth={tileWidth ? tileWidth : 16} scale={2} >
            {children}
        </Grid>
    );
}

export default TileMap;
