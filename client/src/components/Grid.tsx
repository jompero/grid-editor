import * as React from 'react';

export interface Props {
    rows: number,
    columns: number,
    tileHeight: number,
    tileWidth: number,
    scale: number,
    children: React.ReactNode
}

function Grid({ rows, columns, tileHeight, tileWidth, scale, children }: Props) {
    const gridContainerStyle = {
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${columns}, ${tileWidth * scale}px [col-start])`,
        gridTemplateRows: `repeat(${rows}, ${tileHeight * scale}px [row-start])`,
    }

    const childrenStyle = {
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
    }

    function styledChildren(): any {
        if (!children) return null;
        return React.Children.map(children, (child) => <div style={childrenStyle}>{child}</div>);
    }
    
    return (
        <div style={gridContainerStyle}>
            {styledChildren()}
        </div>
    )
}

export default Grid;