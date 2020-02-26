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
import SelectedHitModal from './../components/selectedHitModal';

const styles = theme => ({
  listRoot: {

  }
});

class HitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedHit: {}
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = hitKey => {
    // console.log(this.props.hits.find(hit => hit.id === hitKey));
    this.setState ({
      open: true,
      selectedHit: this.props.hits.find(hit => hit.id === hitKey)
    })
  }

  handleClose() {
    this.setState ({
      open: false,
      selectedHit: {}
    })
  }

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
                <ListItem button key={hit.id} onClick={() => this.handleClickOpen(hit.id)}>
                  <ListItemText primary={hit.title} secondary={formatApiDateToFriendly(hit.hitDate)} />
                </ListItem>
              )
            :
              'No hits yet'
            }
          </List>
        </CardContent>
        <SelectedHitModal selectedHit={this.state.selectedHit} open={this.state.open} onClose={this.handleClose} />
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
