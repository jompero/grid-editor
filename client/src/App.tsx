import * as React from 'react';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Maps from './components/Maps';
import TopBar from './components/TopBar';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <TopBar>
        <Switch>
          <Route exact path='/login'><Login /></Route>
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
