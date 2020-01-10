import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function LoadingSpinner() {

  return (
    <div>
      THIS IS MOTHER FUCKING LOADING
      <div className="lds-ripple">
        <CssBaseline />
        <div></div>
        <div></div>
      </div>
    </div>
  );
}