import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
class DlgUrl extends Component{
  state= { 
      showModal: false,
      hiddenPacks:true,
      error:"",
  }

  close=()=> {
    this.setState({ showModal: false });
  }

  open=()=>{
   var self=this;
   this.setState({ showModal: true });
   Client.get(this.props.url,this.props.data, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.props.parent.handleContactChange(self.props.index,result.data);
          self.close();
       }
   })
  }
  render=()=> {
    return (
        <a  style={{marginLeft:"4px"}} onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
        </a>
    );
  }
}
export default DlgUrl;