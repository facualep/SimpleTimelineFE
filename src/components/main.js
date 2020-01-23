import React, { Component } from 'react';

import Dashboard from './dashboard';

import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core';


const styles = theme => ({

});


class Main extends Component {

  state = {
    open: false,
  }

  UNSAFE_componentWillMount() {

  }

  render () {
    return (
      <div className={clsx("main-component", this.props.classes.root)}>
        <main>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            {/* <Route path="/:post_id" component={Post} /> */}
          </Switch>
        </main>
      </div>
    );
  } 
}

const mapStateToProps = (state) => {
  return {

  }

}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));