import React from 'react';
import PackItems from "./PackItems";
import {Modal} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
import Autocomplete from 'react-autocomplete'
var createReactClass = require('create-react-class');
const UsePackEdit = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      usepack:{},
      bg:{},
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
    if (this.props.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.usepacks[this.props.index];
      this.setState({hiddenusepacks:false});
    }
    this.setState({usepack:this.old});
  },
  render() {
    console.log(this.state.hiddenusepacks);
    return (
        <a onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.usepack.pack} />
                </td>
                <td>
                    <label>名称:</label>
                </td>
                <td>
                    <input style={{"background-color":this.state.bg.yonghu}}  type="text" id="yonghu" name="yonghu" value={this.state.usepack.name} onChange={this.handleChange} />
                </td>
            </tr></tbody>
            </table>
        <div id="id_useusepacks">
        <PackItems  pack_id={this.state.usepack.pack}/>
        </div>
                </Modal.Body>
        </Modal>
        </a>
    );
  }
});
export default UsePackEdit;