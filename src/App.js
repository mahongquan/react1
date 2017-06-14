import React, { Component } from 'react';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,DropdownButton} from "react-bootstrap";
class App extends Component {
  render() {
    return (
    <div id="todoapp">
    <Navbar className="navbar-inverse">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">装箱单</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">合同</NavItem>
      <NavItem eventKey={2} href="#">管理</NavItem>
      <NavItem eventKey={4} href="#">备件</NavItem>
      <NavItem eventKey={5} href="#">复制包</NavItem>
      <NavItem eventKey={6} href="#">统计</NavItem>
      {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>*/}
    </Nav>
  </Navbar>
    <div>
    <table>
    <tr>
   <td>
     <DropdownButton title="Dropdown">
      <MenuItem eventKey="1">登录</MenuItem>
      <MenuItem eventKey="2">注销</MenuItem>
      </DropdownButton>
  </td>
  <td>
        <input type="text" id="id_input_search"  placeholder="合同 or 仪器编号" value="" />
        <button id="id_bt_search" className="btm btn-info">搜索
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
        <button id="id_bt_new"  className="btn btn-primary">新仪器</button>
        <button id="id_bt_standard"  className="btn btn-info">导入标样</button>
  </td>
   <td>
    <DropdownButton title="过滤">
      <MenuItem className="baoxiang">马红权</MenuItem>
      <MenuItem className="baoxiang">陈旺</MenuItem>
      <MenuItem className="baoxiang">吴振宁</MenuItem>
      <MenuItem className="baoxiang">*</MenuItem>
    </DropdownButton>
  </td>
  </tr>
 </table>
 </div>
      <div id="main" style={{"min-height":"200px"}}>
      <table  className="table-bordered" >
    　<thead>
    　　<tr>
    　　　<td>ID</td><td>用户单位</td><td>客户地址</td><td>通道配置</td><td>仪器型号</td><td>仪器编号</td><td>包箱</td><td>审核</td>
          <td>入库时间</td><td>调试时间</td><td>合同编号</td><td>方法</td><td>操作</td>
    　　</tr>
   　</thead> 
      <tbody id="contact-list">
      </tbody>
      </table>
      <a id="bt_prev">前一页</a> 
      <label id="page">page/page</label>
      <a id="bt_next">后一页</a>
      <input id="page_input" value="1" maxlength="6" size="6" />
      <button id="page_go"  className="btn btn-info">跳转</button>
    </div>
  </div>
    );
  }
}
export default App;
