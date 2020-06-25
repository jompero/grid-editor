import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import Maps from './components/Maps';
import TopBar from './components/TopBar';
import Login from './components/Login';
import Notification from './components/Notification';
import { ThemeProvider, createMuiTheme, CssBaseline, useMediaQuery } from '@material-ui/core';
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from './reducers/themeReducer';

function App() {
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.theme);
  const userPreference = useMediaQuery('(prefers-color-scheme: dark)')  ? 'dark' : 'light';

  if (type !== userPreference) {
    dispatch(toggleDarkMode(userPreference));
  }

  const theme = createMuiTheme({
    palette: {
      type: type,
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
