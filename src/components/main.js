import React, { Component } from 'react';

import Login from './login';
import Dashboard from './dashboard';
import Register from './register';
import LogoutModal from './logoutModal';
import Navbar from './navbar';
import DrawerMenu from '../components/menu';


import {Route, Switch} from 'react-router-dom';
import cookie from 'react-cookies';
import {loginUser, refreshUser, clearUser} from './../actions/userActions';
import { connect } from 'react-redux';
import { apiGetUserData, apiRefreshLoginUser } from './../lib/apiClient';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    // zIndex: -1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: '75px',
    marginLeft: -drawerWidth,
  },
  noMenu: {
    marginLeft: 0
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

// const classes = useStyles();

class Main extends Component {

  // classes = useStyles();

  state = {
    open: false,
  }

  toggleMode = () => {
    this.setState({
      open: !this.state.open
    })
  }

  componentWillMount() {
    let token = cookie.load('accessToken');
    let refresh = cookie.load('refreshToken');
    let expiration = cookie.load('expiration');
    let refreshExp = cookie.load('refreshTokenExpiration');
    let userId = cookie.load('userId');
    if (token && expiration && refresh && refreshExp) {
      console.log(expiration, Date.parse(expiration), Date.now())
      if (Date.parse(expiration) > Date.now()) {
      // if (false) {
        console.log('token is active');
        apiGetUserData(token)
        .then(getUserResponse => {
          if (!getUserResponse.error) {
            let loginData = {
              accessToken: token,
              expiration: expiration,
              refreshToken: refresh,
              refreshTokenExpiration: refreshExp
            }
            const user = Object.assign(loginData, getUserResponse.data);
            this.props.loginUser(user)
          } else {
            alert (getUserResponse.errorMsj); 
          }
        })
      } else {
        console.log('token has expired', Date.parse(refreshExp), Date.now(), userId);
        if (Date.parse(refreshExp) > Date.now() && userId) {    
          apiRefreshLoginUser(userId, refresh)
          .then(getLoginResponse => {
            console.log(getLoginResponse);
            if (!getLoginResponse.error) {
              apiGetUserData(getLoginResponse.data.accessToken)
              .then(getUserResponse => {
                if (!getUserResponse.error) {
                  const user = Object.assign(getLoginResponse.data, getUserResponse.data);
                  this.props.loginUser(user)
                } else {
                  alert (getUserResponse.errorMsj); 
                }
              })
            } else {
              alert (getLoginResponse.errorMsj); 
            }
          })
          .catch( response =>{
            console.log(response);
            this.props.clearUser();
          })
        } else {
          this.props.refreshUser();
        }
      }
    } else {
      this.props.refreshUser();
    }
  }

  render () {
    return (
      <div className={clsx("main-component", this.props.classes.root)}>
        <Navbar mode={this.state.open} setMode={this.toggleMode} drawerWidth={drawerWidth}/>,
        { this.props.loggedIn ? 
            <DrawerMenu mode={this.state.open} setMode={this.toggleMode} drawerWidth={drawerWidth}/>
          :
            []
        }
        <main className={clsx(
          this.props.classes.content, 
          {[this.props.classes.contentShift]:this.state.open}, 
          {[this.props.classes.noMenu]:!this.props.loggedIn})}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <Route path="/:post_id" component={Post} /> */}
          </Switch>
        </main>
        <LogoutModal/>
      </div>
    );
  } 
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser : (user) => {dispatch(loginUser(user))},
    refreshUser: () => {dispatch(refreshUser())},
    clearUser: () => {dispatch(clearUser())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));