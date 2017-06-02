import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import UserComponent from './UserComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TableExampleSimple from './TableExampleSimple';
import ToolbarExamplesSimple from './ToolbarExamplesSimple';
injectTapEventPlugin();
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';
var csrf_token="";
var user="";
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <ToolbarExamplesSimple />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <TableExampleSimple />
        </MuiThemeProvider>
        
      </div>
    );
  }
}

export default App;
