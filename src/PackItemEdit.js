import React from 'react';
import {Modal} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
var createReactClass = require('create-react-class');
const PackItemEdit = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      packitem:{},
      hiddenPacks:true,
      bg:{},
      date_open:false,
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
      this.old=this.parent.state.items[this.props.index];
    }
    this.setState({packitem:this.old});
  },
  handleClear (data) {
  },
  handleCopy(data) {
  },
  handleSave (data) {
  },
  handleChange(e){
    console.log("change");
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
      this.state.bg[e.target.name]="#ffffff";
    }
    else{
      this.state.bg[e.target.name]="#8888ff"; 
    }
    const contact2=update(this.state.packitem,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({contact:contact2});
  },
  render() {
    return (
        <a onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr><tr>
                <td>
                    name:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="addr" value={this.state.packitem.name} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>guige:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yiqixinghao}} type="text" id="yiqixinghao" name="yiqixinghao" value={this.state.packitem.guige}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>bh:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" id="baoxiang" name="baoxiang" value={this.state.packitem.bh}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>ct:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.ct}}
                    id="yujifahuo_date" name="ct"  value={this.state.packitem.ct} onChange={this.handleChange} />
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       <button  id="bt_clear" onClick={this.handleClear}>清除</button> 
       <button  id="bt_clearid" onClick={this.handleCopy}>复制</button>
       </div>
                </Modal.Body>
        </Modal>
        </a>
    );
  }
});
export default PackItemEdit;