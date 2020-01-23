import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';

import 'date-fns';
import CreateHit from './createHit';
import HitList from './hitList'

import { apiGetHits } from './../lib/apiClient';
import { loadHitsToStore } from './../actions/siteActions';

const styles = theme => ({
  gridRoot: {
    flexGrow: 1,
  },
  listRoot: {

  }
});

class Dashboard extends Component {

  UNSAFE_componentWillMount() {
    apiGetHits()
    .then(getHitsResponse => {
      if (!getHitsResponse.error) {
        this.props.loadHitsToStore(getHitsResponse.result);
      } else {
        console.log('api error');
      }
    });
  }
  
  render() {
    return(
      <div className="grey-background">
        <Container>
          <Grid container className={this.props.classes.gridRoot} spacing={2}>
            <Grid item xs={8}>
              <HitList/>
            </Grid>
            <Grid item xs={4}>
              <CreateHit/>
            </Grid>
          </Grid>

        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    placeholder: 'placeholder'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadHitsToStore : (hits) => {dispatch(loadHitsToStore(hits))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))