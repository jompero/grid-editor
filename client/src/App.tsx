import * as React from 'react';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Maps from './components/Maps';
import TopBar from './components/TopBar';

function App() {
  return (
    <Router>
      <TopBar>
        <Switch>
          <Route exact path='/'>
            <ToolBar>
              <Canvas />
            </ToolBar>
          </Route>
          <Route path='/maps'><Maps /></Route>
        </Switch>
      </TopBar>
    </Router>
  );
}

export default App;
