import React, {Component} from 'react';
import { Typography, Modal, Button } from '@material-ui/core';
import {toggleLogoutModal} from './../actions/siteActions';
import {logoutUser} from './../actions/userActions';
import { connect } from 'react-redux';

class LogoutModal extends Component { 
  // state = {
  //   open: false,
  // }

  handleClose = () => {
    this.props.toggleLogoutModal(false);
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.user.accessToken);
  }

  render () {    
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.logoutModalToggle}
          onClose={this.handleClose}
        >
          <div className="modal-paper">
            <Typography variant="h6" id="modal-title">
              Cerrar sesión
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Estás seguro de que deseas cerrar sesión?
            </Typography>
            <div className="buttons-container right">
              <Button onClick={this.handleClose}>
                Cancelar
              </Button>
              <Button onClick={this.handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    logoutModalToggle: state.siteState.logoutModalOpen,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogoutModal : (toggle) => {dispatch(toggleLogoutModal(toggle))},
    logoutUser : (accessToken) => {dispatch(logoutUser(accessToken))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutModal);