import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {formatApiDateToFriendly} from './../lib/helpers';

const styles = theme => ({
  listRoot: {

  }
});

class HitList extends Component {
  render() {
    return (
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Listado de hitos
          </Typography>
          <List className={this.props.classes.listRoot}>
            {this.props.hits ?
              this.props.hits.map((hit) =>
                <ListItem button key={hit.id}>
                  <ListItemText primary={hit.title} secondary={formatApiDateToFriendly(hit.hitDate)} />
                </ListItem>
              )
            :
              'No hits yet'
            }
          </List>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hits: state.hits
  }
}

export default connect(mapStateToProps)(withStyles(styles)(HitList))
