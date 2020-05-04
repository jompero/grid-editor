import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import getMaps from '../services/maps';

const useStyles = makeStyles((theme: Theme) => createStyles({
    // Create styles
}));

function Maps() {
  const classes = useStyles();
  useEffect(() => {
      
      return () => {
          
      }
  }, [])

  return (
        <div>
          {getMaps()}
        </div>
  );
}

export default Maps;
