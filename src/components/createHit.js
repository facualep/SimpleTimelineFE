import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

import { loadCreatedHit } from './../actions/siteActions';
import { apiCreateHit } from './../lib/apiClient';

const styles = theme => ({
  root: {
    '& > *': {
      margin: 0,
    },
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  input: {
    width: 'calc(100% - 16px)',
    marginBottom: 8,
  },
  inputDate: {
    marginTop: 0,
  }
});

class CreateHit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hitDate: null,
      // hitDate: new Date('2014-08-18T21:11:54'),
      hitTitle: '',
      hitDescription: '',
      hitLinks: ''
    }

    this.handleDateChange         = this.handleDateChange.bind(this);
    this.handleDescriptionChange  = this.handleDescriptionChange.bind(this);
    this.handleTitleChange        = this.handleTitleChange.bind(this);
    this.handleLinksChange        = this.handleLinksChange.bind(this);
    this.handleSubmit             = this.handleSubmit.bind(this);

  }

  handleDateChange = date => {
    this.setState({
      hitDate: date
    })
  };

  handleDescriptionChange(e) {
    this.setState({hitDescription: e.target.value})
  }

  handleTitleChange(e) {
    this.setState({hitTitle: e.target.value})
  }

  handleLinksChange(e) {
    this.setState({hitLinks: e.target.value})
  }

  restartForm() {
    this.setState({
      hitDate: null,
      // hitDate: new Date('2014-08-18T21:11:54'),
      hitTitle: '',
      hitDescription: '',
      hitLinks: ''
    })
  }

  handleSubmit(e) {
    if (
      // title is ok
      (typeof this.state.hitTitle === 'string' || this.state.hitTitle instanceof String)
      
      ||

      //description is ok
      (typeof this.state.hitDescription === 'string' || this.state.hitDescription instanceof String)

      ||

      // date is ok
      (this.state.hitDate instanceof Date)) {
        
        let links = this.state.hitLinks.replace(/\s/g, '');
        links = links.split(',');
        apiCreateHit(this.state.hitDate, this.state.hitTitle, this.state.hitDescription, links)
        .then( createHitResponse => {
          console.log(createHitResponse)
          if (!createHitResponse.error) {
            this.props.loadCreatedHit(createHitResponse.result);
            this.restartForm();
          } else {
            console.log('error');
          }
        })
      }
    e.preventDefault();
  }
  

  render() {
    return (
      <form className={this.props.classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <Card className={this.props.classes.card}>
          <CardContent>
            {/* <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
              Word of the Day
            </Typography> */}
            <Typography variant="h4" gutterBottom>
              Crear un nuevo hito
            </Typography>
              <TextField id="new-hit-title" className={this.props.classes.input} label="Titulo del hito" 
                value={this.state.hitTitle} onChange={this.handleTitleChange}/>
              <MuiPickersUtilsProvider className={this.props.classes.input} utils={DateFnsUtils}>
                <KeyboardDatePicker className={this.props.classes.inputDate}
                  margin="normal"
                  id="new-hit-date"
                  label="Fecha del hito"
                  format="MM/dd/yyyy"
                  value={this.state.hitDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextField id="new-hit-description" className={this.props.classes.input} label="Descripción del hito" 
                multiline={true} rows={1}rowsMax={10} value={this.state.hitDescription} onChange={this.handleDescriptionChange}/>
              <TextField id="new-hit-links" className={this.props.classes.input} label="Links (separados por coma)" 
                multiline={true} rows={1}rowsMax={10} onChange={this.handleLinksChange} value={this.state.hitLinks}/>
            </CardContent>
            <CardActions>
              <Button type="submit" style={{ flex: 1 }} size="small" color="primary">Crear Hito</Button>
            </CardActions>
          </Card>
        </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCreatedHit : (hit) => {dispatch(loadCreatedHit(hit))}
  }
}


export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateHit))

