import React from 'react';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import eraserIcon from '@iconify/icons-mdi/eraser';
import { setBrush } from '../../reducers/brushReducer';


function Eraser() {
  const dispatch = useDispatch();

  return (
        <div>
            <div onClick={() => dispatch(setBrush(-1))}>
                <IconButton>
                    <Icon icon={eraserIcon} />
                </IconButton>
            </div>
        </div>
  );
}

export default Eraser;
