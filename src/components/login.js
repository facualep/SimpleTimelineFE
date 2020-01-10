import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from './../taskify.png';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import LoadingSpinner from './loadingSpinner';


import { apiLoginUser, apiGetUserData } from './../lib/apiClient';


import loginUser from './../actions/userActions';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '180px',
    margin: 'auto',
    marginBottom: '30px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Login extends Component {
  state = {
    mail: 'Arnaldo@mail.com',
    password: 'Arnaldo123'
  }

  validateCredentials = async() => {
    apiLoginUser(this.state.mail, this.state.password)
    .then(loginResponse => {
      if (!loginResponse.error) {
        apiGetUserData(loginResponse.data.accessToken)
        .then(getUserResponse => {
          if (!getUserResponse.error) {
            const user = Object.assign(loginResponse.data, getUserResponse.data);
            this.props.loginUser(user)
          } else {
            alert (getUserResponse.errorMsj); 
          }
        })
      } else {
        alert (loginResponse.errorMsj); 
      }
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.validateCredentials();
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    switch(this.props.loggedIn) {
      case null:
        return (
          <div className="loading-application center">
            <LoadingSpinner/>
          </div>
        )
      case true:
        return (
          <Redirect to="/"/>
        )
      default:
        return (

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={this.props.classes.paper}>
              <img src={Logo} className={this.props.classes.logo} alt="taskify logo"/>
              <Typography component="h1" variant="h5">
                Ingresar
              </Typography>
              <form className={this.props.classes.form} onSubmit={this.handleSubmit} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="mail"
                  label="Email Address"
                  name="mail"
                  autoComplete="email"
                  value={this.state.mail}
                  onChange={this.handleChange}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password} 
                  onChange={this.handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          
          /*
          <div className="container">
            <div className="center">
              <img src={Logo} className="center" alt="taskify logo"/>
            </div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="mail">Mail:</label>
              <input type="text" name="mail" value={this.state.mail} onChange={this.handleChange}/>
              <label htmlFor="password">Contraseña:</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
              <div className="center">
                <button className="btn" type="submit">Ingresar</button>
              </div>
            </form>
          </div>
          */
        )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser : (user) => {dispatch(loginUser(user))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));