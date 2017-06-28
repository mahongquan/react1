import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Client from './Client';
import UsePacks from './UsePacks';
import update from 'immutability-helper';
import { Table, TableBody, TableHeader, TableHeaderColumn, tr, td } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
let DateTimeFormat;
if (areIntlLocalesSupported( ['zh-Hans'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh-Hans');
}
export default class ContactEdit extends React.Component {
  state = {
    open: false,
    shenhe:null,
    yiqixinghao:null,
    hetongbh:null,
    id:null,
    baoxiang:null,
    yonghu:null,
    tiaoshi_date:"",
    channels:null,
    yiqibh:null,
    addr:null,
    yujifahuo_date:"",

    yiqixinghao_items:["CS-2800","ON-3000"],
    channels_items:["2C+1S","2O"],
  };
  yiqixinghao_change=(value)=>{
  };
  yiqixinghao_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({yiqixinghao:data});
  }
  channels_change=(value)=>{
  };
  channels_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({channels:data});
  }

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
  tiaoshi_date_change=(e,d)=>{
    this.setState({tiaoshi_date:d.toDateString()});
  }
 yujifahuo_date_change=(e,d)=>{
    this.setState({yujifahuo_date:d.toDateString()});
  }

  render() {
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    var m1 = new Date(this.state.yujifahuo_date.replace(/-/,"/"));
    var m2 = new Date(this.state.tiaoshi_date.replace(/-/,"/"));
    return (
      <div>
        <RaisedButton label={this.props.title} onTouchTap={this.handleOpen} />
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
            <table>
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <TextField type="text" id="id" name="id"  disabled={true}    value={this.state.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <TextField type="text" id="yonghu" name="yonghu" value={this.state.yonghu}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <TextField type="text" id="addr" name="addr" value={this.state.addr}  onChange={this.handleChange} /> 
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                    <AutoComplete name="channels"
                      openOnFocus={true}
                      searchText={this.state.channels}
                      onUpdateInput={this.channels_change}
                      dataSource={this.state.channels_items}
                      onNewRequest={this.channels_select}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                    <AutoComplete name="yiqixinghao"
                      openOnFocus={true}
                      searchText={this.state.yiqixinghao}
                      onUpdateInput={this.yiqixinghao_change}
                      dataSource={this.state.yiqixinghao_items}
                      onNewRequest={this.yiqixinghao_select}
                    />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <TextField type="text" id="yiqibh" name="yiqibh" value={this.state.yiqibh} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <TextField type="text" id="baoxiang" name="baoxiang" value={this.state.baoxiang}  
                    onChange={this.handleChange} 
                    style={{
                      backgroundColor: this.state.bxbg,
                    }}
                    />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <TextField type="text" id="shenhe" name="shenhe" value={this.state.shenhe} onChange={this.handleChange}  />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <DatePicker  locale="zh-Hans" hintText="yujifahuo_date" onChange={this.yujifahuo_date_change} value={m1}/>
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                    <DatePicker locale="zh-Hans" hintText="tiaoshi_date" onChange={this.tiaoshi_date_change} value={m2}/>
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <TextField type="text" id="hetongbh" name="hetongbh" value={this.state.hetongbh} onChange={this.handleChange}  />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <TextField type="text" id="method" name="method"   disabled={true} value={this.state.method} />
                </td>
            </tr>        
            </tbody>
            </table>
           <div> 
           <RaisedButton onTouchTap={this.handleSave} >保存</RaisedButton> 
           <RaisedButton  onTouchTap={this.handleClear} >清除</RaisedButton> 
           <RaisedButton onTouchTap={this.handleCopy} >复制</RaisedButton>
           <UsePacks contact_id={this.state.id}/>
           </div>
        </Dialog>
        </div>
    );
  }
}