import * as React from 'react';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';

function App() {
  return (
    <div>
      <ToolBar>
        <Canvas width = {16} height = {16} tileHeight = {16} tileWidth = {16} />
      </ToolBar>
    </div>
  );
}

export default App;