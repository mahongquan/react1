import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Client from './Client';
import UsePacks from './UsePacks';
import update from 'immutability-helper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
export default class ContactEdit extends React.Component {
  state = {
    open: false,
    shenhe:null,
    yiqixinghao:null,
    hetongbh:null,
    id:null,
    baoxiang:null,
    yonghu:null,
    tiaoshi_date:null,
    channels:null,
    yiqibh:null,
    addr:null,
    yujifahuo_date:null,
  };
  handleOpen = () => {
    console.log("open");
    this.contact_idx=this.props.contact;
    this.parent=this.props.parent;
    var contact=this.parent.state.contacts[this.contact_idx];
    if (contact==null){
        contact={}
    }
    console.log(contact);
    this.setState({
        open:true,
        yujifahuo_date:contact.yujifahuo_date,
        yonghu:contact.yonghu,
        yiqixinghao:contact.yiqixinghao,
        addr:contact.addr,
        hetongbh:contact.hetongbh,
        shenhe:contact.shenhe,
        tiaoshi_date:contact.tiaoshi_date,
        id:contact.id,
        yiqibh:contact.yiqibh,
        baoxiang:contact.baoxiang,
        channels:contact.channels,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleChange = (e) => {
    console.log("change");
    // e.target.inputStyle={
    //   width: '50%',
    //   margin: '0 auto',
    //   border: '2px solid #FF9800',
    //   backgroundColor: '#ffd699',
    // };
    console.log(e.target.value);
    //e.target.style.backgroundColor="rgba(0x88,0x88,0xff,0)";
    //var contact1={};
    switch(e.target.name)
    {
        case "baoxiang":
            this.setState({baoxiang:e.target.value});
            break;
        case "yonghu":
            this.setState({yonghu:e.target.value});
            break;
        case "addr":
            this.setState({addr:e.target.value});
            break;
        case "channels":
            this.setState({channels:e.target.value});
            break;
        case "yiqixinghao":
            this.setState({yiqixinghao:e.target.value});
            break;
        case "yiqibh":
            this.setState({yiqibh:e.target.value});
            break;
        case "shenhe":
            this.setState({shenhe:e.target.value});
            break;
        case "yujifahuo_date":
            this.setState({yujifahuo_date:e.target.value});
            break;
        case "tiaoshi_date":
            this.setState({tiaoshi_date:e.target.value});
            break;
        case "hetongbh":
            this.setState({hetongbh:e.target.value});
            break;
        default:
            break;
    }
  };
  handleSave= (data) => {
    var url="/rest/Contact";
    Client.post(url,this.state,(res) => {
        this.setState(res.data);
        this.parent.handleContactChange(this.contact_idx,res.data);
    });
  };
  handleClear= () => {
    console.log("clear");
    this.setState({
        yujifahuo_date:"",
        yonghu:"",
        yiqixinghao:"",
        addr:"",
        hetongbh:"",
        shenhe:"",
        tiaoshi_date:"",
        id:"",
        yiqibh:"",
        baoxiang:"",
        channels:"",
    })
  };
  handleCopy= () => {
    console.log("clear");
    this.setState({
        id:"",
    })
  };
  render() {

    return (
      <div>
        <RaisedButton label={this.props.title} onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
            <Table>
            <TableBody>
            <TableRow >
                <TableRowColumn >
                    ID:
                </TableRowColumn>
                <TableRowColumn >
                    <TextField type="text" id="id" name="id"  disabled={true}    value={this.state.id} />
                </TableRowColumn>
                <TableRowColumn>
                    <label>用户单位:</label>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="yonghu" name="yonghu" value={this.state.yonghu}  onChange={this.handleChange} />
                </TableRowColumn>
            </TableRow><TableRow>
                <TableRowColumn>
                    客户地址:
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="addr" name="addr" value={this.state.addr}  onChange={this.handleChange} /> 
                </TableRowColumn>
                <TableRowColumn>
                    通道配置:
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="channels" name="channels" value={this.state.channels} onChange={this.handleChange} />
                </TableRowColumn>
            </TableRow><TableRow>
                <TableRowColumn>
                    <label>仪器型号:</label>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="yiqixinghao" name="yiqixinghao" value={this.state.yiqixinghao} onChange={this.handleChange} />
                </TableRowColumn>
                <TableRowColumn>
                    <label>仪器编号:</label>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="yiqibh" name="yiqibh" value={this.state.yiqibh} onChange={this.handleChange} />
                </TableRowColumn>
            </TableRow><TableRow>
                <TableRowColumn>
                    <label>包箱:</label>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="baoxiang" name="baoxiang" value={this.state.baoxiang}  
                    onChange={this.handleChange} 
                    style={{
                      backgroundColor: this.state.bxbg,
                    }}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    审核:
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="shenhe" name="shenhe" value={this.state.shenhe} onChange={this.handleChange}  />
                </TableRowColumn>
            </TableRow><TableRow>
                <TableRowColumn>
                    <label>入库时间:</label>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" className="mydate" id="yujifahuo_date" name="yujifahuo_date" value={this.state.yujifahuo_date}  onChange={this.handleChange} />
                </TableRowColumn>
                <TableRowColumn>
                    调试时间:
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" className="mydate" id="tiaoshi_date" name="tiaoshi_date" value={this.state.tiaoshi_date}  onChange={this.handleChange} />
                </TableRowColumn>
            </TableRow><TableRow>
                <TableRowColumn>
                    <label>合同编号:</label>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField type="text" id="hetongbh" name="hetongbh" value={this.state.hetongbh} onChange={this.handleChange}  />
                </TableRowColumn>
                <TableRowColumn>
                    方法:
                </TableRowColumn>
                <TableRowColumn>
                <TextField type="text" id="method" name="method"   disabled={true} value={this.state.method} />
                <RaisedButton>选择文件</RaisedButton>
                <RaisedButton>清除</RaisedButton>
                </TableRowColumn>
            </TableRow>        
            </TableBody>
            </Table>
           <div> 
           <RaisedButton onTouchTap={this.handleSave} >保存</RaisedButton> 
           <RaisedButton  onTouchTap={this.handleClear} >清除</RaisedButton> 
           <RaisedButton onTouchTap={this.handleCopy} >复制</RaisedButton>
           <UsePacks />
           </div>
        </Dialog>
        </div>
    );
  }
}