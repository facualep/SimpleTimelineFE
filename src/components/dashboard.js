import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
});

class Dashboard extends Component {
  state = {
    newHitSelectedDate: new Date('2014-08-18T21:11:54'),
  }

  handleDateChange = date => {
    this.state.newHitSelectedDate = date
  };

  componentWillMount() {

  }
  
  render() {
    return(
      <div className="grey-background">

        <form className={this.props.classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Titulo del hito" />
          <TextField id="standard-basic" label="Descripción del hito" 
            multiline={true} rows={1}rowsMax={10}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={this.state.newHitSelectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))