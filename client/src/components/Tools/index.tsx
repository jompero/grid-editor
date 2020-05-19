import React, { ReactElement } from 'react';
import Eraser from './Eraser';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import Load from './Load';
import Palette from './Palette';
import Tune from './Tune';
import { List, ListItem } from '@material-ui/core';


const tools = [
  <Tune />,
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
          {tools.map((tool: ReactElement, index: number) => {
              return (
                <ListItem key={index}>
                  {tool}
                </ListItem>
              )
            }
          )}
        </List>
  );
}

export default Tools;
