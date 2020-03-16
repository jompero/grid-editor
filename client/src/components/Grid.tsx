import * as React from 'react';

export interface Props {
    rows: number,
    columns: number,
    tileHeight: number,
    tileWidth: number,
    children: React.ReactNode
}

function Grid({ rows, columns, tileHeight, tileWidth, children }: Props) {
    const gridContainerStyle = {
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${columns}, ${tileWidth}px [col-start])`,
        gridTemplateRows: `repeat(${rows}, ${tileHeight}px [row-start])`,
      }

    return (
        <div style={gridContainerStyle}>
            {children}
        </div>
    )
}

export default Grid;