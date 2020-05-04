import * as React from 'react';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Maps from './components/Maps';

function App() {
  return (
    <Router>
      <ToolBar>
        <Link to='/'>Home </Link>
        <Link to='/maps'>Maps </Link>

        <Switch>
          <Route exact path='/'><Canvas width={16} height={16} tileHeight={16} tileWidth={16} /></Route>
          <Route path='/maps'><Maps /></Route>
        </Switch>
      </ToolBar>
    </Router>
  );
}

export default App;
