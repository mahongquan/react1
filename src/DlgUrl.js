import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
var createReactClass = require('create-react-class');
const DlgUrl = createReactClass({
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
   Client.get(this.props.url,this.props.data, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.close();
       }
   })
  },
  render() {
    console.log(this.state.hiddenPacks);
    return (
        <a  style={{marginLeft:"10px"}} onClick={this.open}>{this.props.title}
        <div>
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
        </div>
        </a>
    );
  }
});
export default DlgUrl;