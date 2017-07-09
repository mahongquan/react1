import React, { Component } from 'react';
import {Navbar,Nav,NavItem,MenuItem,DropdownButton} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
import DialogExampleSimple from "./DialogExampleSimple"
import DialogImportStandard from "./DialogImportStandard"
import ContactEdit from "./ContactEdit"
import update from 'immutability-helper';
injectTapEventPlugin();
var user = "";
class App extends Component {
  state = {
    contacts: [],
    showRemoveIcon: false,
    searchValue: '',
    open: false,
    logined: false,
    user: "AnonymousUser",
    selected:null,
  //csrf_token:"",
  }

  componentDidMount=() => {
    Client.contacts("", (contacts) => {
      var user=contacts.user;
      if(user==undefined){
        user="AnonymousUser"
      }
      this.setState({
        contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        user: user,
      });
      if (user === "AnonymousUser") {
        this.setState({
          logined: false
        });
      } else {
        this.setState({
          logined: true
        });
      }
    });
  };
  // removeFoodItem = (itemIndex) => {
  //   const filteredFoods = this.state.selectedFoods.filter(
  //     (item, idx) => itemIndex !== idx,
  //   );
  //   this.setState({ selectedFoods: filteredFoods });
  // }

  // addFood = (food) => {
  //   const newFoods = this.state.selectedFoods.concat(food);
  //   this.setState({ selectedFoods: newFoods });
  // }
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
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        contacts: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.contacts(value, (contacts) => {
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };
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
      <TableRow      key={idx}      onTouchTap={() => this.oncontactClick(idx)}>
        <TableRowColumn>{contact.id}</TableRowColumn>
        <TableRowColumn>{contact.hetongbh}</TableRowColumn>
        <TableRowColumn>{contact.yonghu}</TableRowColumn>
        <TableRowColumn>{contact.baoxiang}</TableRowColumn>
        <TableRowColumn>{contact.yiqixinghao}</TableRowColumn>
      </TableRow>
    ));
    return (
    <div className="container table-responsive" id="todoapp">
    <Navbar className="navbar-inverse">
    <Navbar.Header>
      <Navbar.Brand>
        <a>装箱单</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">合同</NavItem>
      <NavItem eventKey={2} href="/admin">管理</NavItem>
      <NavItem eventKey={4} href="/parts/items/">备件</NavItem>
      <NavItem eventKey={5} href="/parts/copypack/">复制包</NavItem>
      <NavItem eventKey={6} href="/parts/month12/">统计</NavItem>
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
  </td>
  <td>
        <ContactEdit2 parent={this} index={null} title="新仪器" />
  </td>
   <td>
        <DlgImport />
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
<table className="table-bordered"><thead><tr><th>ID</th><th>用户单位</th><th>客户地址</th><th>通道配置</th><th>仪器型号</th><th>仪器编号</th><th>包箱</th><th>审核</th>
<th>入库时间</th><th>调试时间</th><th>合同编号</th><th>方法</th><th>操作</th></tr></thead><tbody id="contact-list">{contactRows}</tbody>
</table>
      <a hidden={prev_hidden} onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}..
      {page}/{this.state.total}</label>
      <a hidden={next_hidden} onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
  </div>
    );
  }
}
export default App;
