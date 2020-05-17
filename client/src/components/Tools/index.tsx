import React from 'react';
import Eraser from './Eraser';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import Load from './Load';
import Palette from './Palette';
import { List, ListItemText, ListItem } from '@material-ui/core';

const tools = [
  <Eraser />,
  <Undo />,
  <Redo />,
  <Save />,
  <Load />,
  <Palette />
];

function Tools() {
  return (
        <List id='tools'>
          {tools.map(tool => {
              return (
                <ListItem>
                  {tool}
                </ListItem>
              )
            }
          )}
        </List>
  );
}

export default Tools;
