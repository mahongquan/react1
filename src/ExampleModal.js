import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginFormComponent from "./LoginFormComponent";
import {Modal,OverlayTrigger,Popover,Button,Overlay,Tooltip,Navbar,Nav,NavItem,NavDropdown,MenuItem,DropdownButton,Table} from "react-bootstrap";
const ExampleModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },
  onLoginSubmit (data)  {
    this.props.onLoginSubmit(data);
  },
  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
        <a onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginFormComponent onLoginSubmit={this.onLoginSubmit} dlgclose={this.close}/>
        </Modal.Body>

        </Modal>
        </a>
    );
  }
});
export default ExampleModal;