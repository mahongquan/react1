import React, { Component } from 'react';
import {Navbar,Nav,NavItem,MenuItem,DropdownButton,Table} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
import ExampleModal from './ExampleModal';
import ContactEdit2 from './ContactEdit2';
var host="";
class App extends Component {
  mystate = {
    start:0,
    limit:5,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
    contacts: [],
    user: "AnonymousUser",
    start:0,
    total:0,
    search:"",
    start_input:1,
  }
  componentDidMount=() => {
    Client.contacts(
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts) => {
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts.total,
          start:this.mystate.start
        });
        this.mystate.total=contacts.total;
    });
  };
  handleTest = () => {
    //const contact2=update(this.state.contacts[this.state.selected],{baoxiang: {$set: "test"}});
    // console.log("handleTest");
    //console.log(contact2);
    //var one=this.state.contacts[this.state.selected];
    var idx=this.state.selected;
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {baoxiang:{$set:"test111"}}});
    console.log(contacts2);
    //this.state.contacts[this.state.selected].baoxiang="test";
    this.setState({contacts:contacts2});
    //this.forceUpdate();
  };
  handleContactChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({contacts:contacts2});
  };
  oncontactClick=(key) => {
    console.log("click row");
    console.log(key);
    this.setState({selected:key});
  };
  handleImportStandard=() => {
    console.log("import row");
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.componentDidMount();
  };
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };
  showlogin = () => {
    console.log("showlogin");
    var data = {
      username: "mahongquan",
      password: "333333"
    };
    this.onLoginSubmit(data);
  };
  handleLogin = () => {
    console.log("login");
    Client.login_index((data) => {
      //console.log(data.csrf_token);
      // const cookies = new Cookies();

      // cookies.set('csrftoken', this.state.csrf_token, { path: '/' });
      this.showlogin();
    });

  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.setState({
        logined: false,
        user: "AnonymousUser",
        total:0,
        start:0,
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
    //this.componentDidMount();
  };
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    //this.setState({start:start});
    this.componentDidMount();
  };
  search = (e) => {
    this.mystate.start=0;
    this.componentDidMount();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.componentDidMount();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };

  onDetailClick=(contactid)=>{
    console.log(contactid);
    window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
  }
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.componentDidMount();
  };
  onSelectBaoxiang=(e) => {
    this.mystate.baoxiang=e;
    this.componentDidMount();
    console.log(e);
  }
  auto_change=(event, value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  }
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  render() {
    const contactRows = this.state.contacts.map((contact, idx) => (
      <tr key={idx} >
        <td>{contact.id}</td>
        <td>{contact.yonghu}</td>
        <td>{contact.addr}</td>
        <td>{contact.channels}</td>
        <td>{contact.yiqixinghao}</td>
        <td>
          <ContactEdit2 parent={this} index={idx} title={contact.yiqibh} />
        </td>
        <td>{contact.baoxiang}</td>
        <td>{contact.shenhe}</td>
        <td>{contact.yujifahuo_date}</td>
        <td>{contact.tiaoshi_date}</td>
        <td>{contact.hetongbh}</td>
        <td>{contact.method}</td>
        <td><a className="contact_detail" data={contact.id} onClick={() => this.onDetailClick(contact.id)}>详细</a>
         <a className="contact_updatemethod" data={contact.id}>更新方法</a>
         <a className="contact_allfile" data={contact.id}>全部文件</a>
         <a className="contact_chuku" data={contact.id}>核对备料计划</a>
        <button className="contact_folder" data={contact.id}>资料文件夹</button>
        </td>
      </tr>
    ));
    return (
    <div id="todoapp">
    <Navbar className="navbar-inverse">
    <Navbar.Header>
      <Navbar.Brand>
        <a>装箱单</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">合同</NavItem>
      <NavItem eventKey={2} href="#">管理</NavItem>
      <NavItem eventKey={4} href="#">备件</NavItem>
      <NavItem eventKey={5} href="#">复制包</NavItem>
      <NavItem eventKey={6} href="#">统计</NavItem>
    </Nav>
  </Navbar>
    <table>
    <tbody>
    <tr>
   <td>
     <DropdownButton title={this.state.user} id="id_dropdown1">
        <li hidden={this.state.user!=="AnonymousUser"}>
          <ExampleModal onLoginSubmit={this.onLoginSubmit} title="登录" />
        </li>
        <li  hidden={this.state.user==="AnonymousUser"} >
          <a onClick={this.handleLogout}>注销</a>
        </li>
     </DropdownButton>
  </td>
  <td>
        <input type="text" value={this.state.search}  placeholder="合同 or 仪器编号" onChange={this.handleSearchChange} />
        <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
        <ContactEdit2 parent={this} index={null} title="新仪器" />
        <button id="id_bt_standard"  className="btn btn-info">导入标样</button>
  </td>
   <td>
    <DropdownButton title="过滤" id="id_dropdown2">
      <MenuItem onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("")}>*</MenuItem>
    </DropdownButton>
  </td>
  </tr>
  </tbody>
 </table>
<Table responsive bordered condensed><thead><tr><th>ID</th><th>用户单位</th><th>客户地址</th><th>通道配置</th><th>仪器型号</th><th>仪器编号</th><th>包箱</th><th>审核</th>
<th>入库时间</th><th>调试时间</th><th>合同编号</th><th>方法</th><th>操作</th></tr></thead><tbody id="contact-list">{contactRows}</tbody></Table>
      <a onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}/{this.state.total}</label>
      <a onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
  </div>
    );
  }
}
export default App;
