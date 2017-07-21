import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
import Browser from './Browser'
var createReactClass = require('create-react-class');
const DlgFolder2 = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      hiddenPacks:true,
      error:"",
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    var self=this;
   this.setState({ showModal: true });
  },
  render() {
    return (
        <a   style={{marginLeft:"2px"}} onClick={this.open}>{this.props.title}
        <div>
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Browser />
          </Modal.Body>
        </Modal>
        </div>
        </a>
    );
  }
});
export default DlgFolder2;