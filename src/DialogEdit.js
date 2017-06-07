import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
export default class DialogEdit extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
   handleChange = () => {
    ;
  };
  onLoginSubmit= (data) => {
    this.props.onLoginSubmit(data);
  };
  render() {
    var contact=this.props.contact;
    if (contact==null){
      contact={};
    }
    //console.log(contact);
    return (
      <div>
        <RaisedButton label={this.props.title} onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={contact.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <input type="text" id="yonghu" name="yonghu" value={contact.yonghu}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <input type="text" id="addr" name="addr" value={contact.addr}  onChange={this.handleChange} /> 
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                    <input type="text" id="channels" name="channels" value={contact.channels} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                    <input type="text" id="yiqixinghao" name="yiqixinghao" value={contact.yiqixinghao} onChange={this.handleChange} />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <input type="text" id="yiqibh" name="yiqibh" value={contact.yiqibh} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <input type="text" id="baoxiang" name="baoxiang" value={contact.baoxiang}  onChange={this.handleChange} />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <input type="text" id="shenhe" name="shenhe" value={contact.shenhe} onChange={this.handleChange}  />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <input type="text" className="mydate" id="yujifahuo_date" name="yujifahuo_date" value={contact.yujifahuo_date}  onChange={this.handleChange} />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                    <input type="text" className="mydate" id="tiaoshi_date" name="tiaoshi_date" value={contact.tiaoshi_date}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <input type="text" id="hetongbh" name="hetongbh" value={contact.hetongbh} onChange={this.handleChange}  />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <input type="text" id="method" name="method" readOnly="true" defaultValue={contact.method} />
                <button>选择文件</button>
                <button>清除</button>
                </td>
            </tr>        
            </tbody>
            </table>
           <div> 
           <button>保存</button> 
           <button>清除</button> 
           <button>复制</button>
           </div>
        </Dialog>
        </div>
    );
  }
}