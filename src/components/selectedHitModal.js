import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {formatApiDateToFriendly} from './../lib/helpers';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  titleDate: {
    fontSize: 14,
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const SelectedHitModal = withStyles(styles)(props => {
  const { onClose, selectedHit, open, classes } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog 
      onClose={handleClose} 
      aria-labelledby="hit-dialog-title" 
      open={open} 
      fullWidth={true}
      maxWidth="sm"
    >
        <DialogTitle id="hit-dialog-title" onClose={handleClose}>
          <div>{selectedHit.title ? selectedHit.title : ''}</div>
          <span className={classes.titleDate}>{selectedHit.hitDate ? formatApiDateToFriendly(selectedHit.hitDate) : ''}</span>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {selectedHit.description ? selectedHit.description : ''}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  );
});

SelectedHitModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedHit: PropTypes.object.isRequired,
};

export default SelectedHitModal;