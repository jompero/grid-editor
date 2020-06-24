import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import Maps from './components/Maps';
import TopBar from './components/TopBar';
import Login from './components/Login';
import Notification from './components/Notification';

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
      <Notification />
    </Router>
  );
}

export default App;
