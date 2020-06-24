import React, { ReactElement } from 'react';
import { List, ListItem } from '@material-ui/core';
import Eraser from './Eraser';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import Load from './Load';
import Palette from './Palette';


const tools = [
  <Load key='load' />,
  <Save key='save' />,
  <Undo key='undo' />,
  <Redo key='redo' />,
  <Eraser key='eraser' />,
  <Palette key='palette' />,
];

function Tools() {
  return (
        <List id='tools'>
          {tools.map((tool: ReactElement, index: number) => (
                <ListItem key={index}>
                  {tool}
                </ListItem>
          ))}
        </List>
  );
}

export default Tools;
