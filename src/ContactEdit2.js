import React from 'react';
import UsePacks2 from "./UsePacks2";
import {Modal,Glyphicon} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
var moment = require('moment');
var locale=require('moment/locale/zh-cn');
var DateTime=require('react-datetime');
var createReactClass = require('create-react-class');
const ContactEdit2 = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      contact:{},
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
      this.old=this.parent.state.contacts[this.props.index];
      this.setState({hiddenPacks:false});
    }
    this.setState({contact:this.old});
  },
  onLoginSubmit (data)  {
    this.props.onLoginSubmit(data);
  },
  handleClear (data) {
    var url="/rest/Contact";
    Client.post(url,this.state.contact,(res) => {
        this.setState({contact:res.data});
        this.parent.handleContactChange(this.props.index,res.data);
        this.old=res.data;
    });
  },
  handleCopy(data) {
    var url="/rest/Contact";
    Client.post(url,this.state.contact,(res) => {
        this.setState({contact:res.data});
        this.parent.handleContactChange(this.props.index,res.data);
        this.old=res.data;
    });
  },
  handleSave (data) {
    var url="/rest/Contact";
    Client.post(url,this.state.contact,(res) => {
        this.setState({contact:res.data});
        this.parent.handleContactChange(this.props.index,res.data);
        this.old=res.data;
    });
  },
  yujifahuo_date_change(value){
    //this.state.yujifahuo_date=value;
    var e_target_name="yujifahuo_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      this.state.bg[e_target_name]="#ffffff";
      console.log("equal");
    }
    else{
      console.log("not equal")
      this.state.bg[e_target_name]="#8888ff"; 
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
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
    const contact2=update(this.state.contact,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({contact:contact2});
  },

  render() {
    console.log(this.state.hiddenPacks);
    return (
        <a onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑仪器信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.contact.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yonghu}}  type="text" id="yonghu" name="yonghu" value={this.state.contact.yonghu} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="addr" value={this.state.contact.addr} onChange={this.handleChange} />
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.channels}}  type="text" id="channels" name="channels" value={this.state.contact.channels} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yiqixinghao}} type="text" id="yiqixinghao" name="yiqixinghao" value={this.state.contact.yiqixinghao}  onChange={this.handleChange} />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.yiqibh}}  type="text" id="yiqibh" name="yiqibh" value={this.state.contact.yiqibh}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" id="baoxiang" name="baoxiang" value={this.state.contact.baoxiang}  onChange={this.handleChange} />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.shenhe}} type="text" id="shenhe" name="shenhe" value={this.state.contact.shenhe}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <DateTime  ref="datetime1" timeFormat={false} 
                    inputProps={
                      {"style":
                        {"backgroundColor":this.state.bg.yujifahuo_date}
                      }
                    } 
                    id="yujifahuo_date" name="yujifahuo_date"  value={this.state.contact.yujifahuo_date} onChange={this.yujifahuo_date_change} />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.tiaoshi_date}}  type="text" className="mydate" id="tiaoshi_date" name="tiaoshi_date" value={this.state.contact.tiaoshi_date}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.hetongbh}}  type="text" id="hetongbh" name="hetongbh" value={this.state.contact.hetongbh}  onChange={this.handleChange} />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <input  style={{"backgroundColor":this.state.bg.method}}  type="text" id="method" name="method" readOnly="true" defaultValue={this.state.contact.method} />
                <button className="btn" id="bt_file"><Glyphicon glyph="pencil" />
                </button>
                <button className="btn" id="bt_removefile"><Glyphicon glyph="remove" /></button>
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       <button  id="bt_clear" onClick={this.handleClear}>清除</button> 
       <button  id="bt_clearid" onClick={this.handleCopy}>复制</button>
       </div>
        <div id="id_usepacks" hidden={this.state.hiddenPacks}>
        <UsePacks2  contact_id={this.state.contact.id}/>
        </div>
                </Modal.Body>
        </Modal>
        </a>
    );
  }
});
export default ContactEdit2;