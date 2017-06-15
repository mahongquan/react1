import React from 'react';
import UsePacks2 from "./UsePacks2";
import {Modal} from "react-bootstrap";
var createReactClass = require('create-react-class');
const ContactEdit2 = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      contact:{}
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
    this.parent=this.props.parent;
    this.contact=this.parent.state.contacts[this.props.index];
    this.setState({contact:this.contact});
  },
  onLoginSubmit (data)  {
    this.props.onLoginSubmit(data);
  },
  render() {
    return (
        <a onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑仪器信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
<table id="table_input" class="table-condensed" >
<tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readonly="true"  disabled="disabled"    value={this.state.contact.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <input type="text" id="yonghu" name="yonghu" value={this.state.contact.yonghu} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <input type="text" id="addr" name="addr" value={this.state.contact.addr} />
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                    <input type="text" id="channels" name="channels" value={this.state.contact.channels} />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                    <input type="text" id="yiqixinghao" name="yiqixinghao" value={this.state.contact.yiqixinghao} />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <input type="text" id="yiqibh" name="yiqibh" value={this.state.contact.yiqibh} />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <input type="text" id="baoxiang" name="baoxiang" value={this.state.contact.baoxiang} />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <input type="text" id="shenhe" name="shenhe" value={this.state.contact.shenhe} />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <input type="text" class="mydate" id="yujifahuo_date" name="yujifahuo_date" value={this.state.contact.yujifahuo_date} />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                    <input type="text" class="mydate" id="tiaoshi_date" name="tiaoshi_date" value={this.state.contact.tiaoshi_date} />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <input type="text" id="hetongbh" name="hetongbh" value={this.state.contact.hetongbh} />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <input type="text" id="method" name="method" readonly="true" value={this.state.contact.method} />
                <button class="btn" id="bt_file">
                  选取文件
                </button>
                <button class="btn" id="bt_removefile">
                 清除
                </button>
                </td>
            </tr>        </table>
       <div align="center"> 
       <button class="btn btn-primary" id="bt_save">保存</button> 
       <button  id="bt_clear">清除</button> 
       <button  id="bt_clearid">复制</button>
       </div>
        <div id="id_usepacks"><UsePacks2 /></div>
                </Modal.Body>
        </Modal>
        </a>
    );
  }
});
export default ContactEdit2;