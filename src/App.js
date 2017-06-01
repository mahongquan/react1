import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
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
var UserComponent = createReactClass({
  getInitialState: function(){
     if(this.props.user==="AnonymousUser"){
      return {
        name: this.props.user,
        logined:false,
      }
    }
    else{
      return {
        name: this.props.user,
        logined:true,
      }
    }
  },
  handleLoginSubmit: function(data) {
    console.log("login submit");
    
      var self=this;
        fetch({
          type: 'POST'
          , url: "/rest/login"
          , data: data
          , complete: function () {
          }
          , error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(errorThrown);
          }
          , success: function (data) {
              //console.log("ajax done");
              //console.log(data);
              data=JSON.parse(data);
              if (data.success) {
                   user=data.data.name;
                   csrf_token=getCookie('csrftoken');
                  //$("#login_form").dialog("destroy");
                  //self.setState({name:user,logined:true});
              }
          }
      });
  },
  handleLogin:function(e) {
    var i_Fac=React.createFactory(LoginFormComponent);
    var iview = i_Fac({onLoginSubmit:this.handleLoginSubmit});
    ReactDOM.render(iview, document.getElementById('login_form'));

    // $("#login_form").dialog({
    //      modal: true
    //      , overlay: {
    //          backgroundColor: '#000'
    //          , opacity: 0.5
    //      }
    //      , autoOpen: true, 
    //      close: function (event,ui) {
    //             //$("#login_form").dialog("destroy");
    //      }
    // });
  },
  handleLogout:function(e) {
   var self=this;
   fetch({
            type: 'POST'
            , url:"/rest/logout"
            , complete: function () {
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(errorThrown);
            }
            , success: function (data) {
                //console.log("ajax done");
                //console.log(data);
                data=JSON.parse(data);
                //console.log(data);
                self.setState({name:"AnonymousUser",logined:false});
            }
        });
  },
  render:function() {
    return (
      <div className="dropdown">
      <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <span id="dropdownMenu1_text">{this.state.name}</span>
        <span className="caret"> </span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li id="li_login" hidden={this.state.logined}><button  id="id_login"  onClick={this.handleLogin}>登录</button></li>
        <li id="li_logout" hidden={!this.state.logined}><button id="id_logout" onClick={this.handleLogout}>注销</button></li>
      </ul>
    </div>
    );
  }
});

var LoginFormComponent = createReactClass({
  getInitialState: function(){
    return {
      name: "",
      pwd:""
    };
  },
  handleNameChange:function(e) {
    this.setState({name: e.target.value});
  },
  handlePwdChange:function(e) {
    this.setState({pwd: e.target.value});
  },

  handleSubmit:function(e) {
      e.preventDefault();
      var data={};
      data["username"]=this.state.name;
      data["password"]=this.state.pwd;
      data["csrfmiddlewaretoken"]={csrf_token};
      this.props.onLoginSubmit(data);
  },
  render:function() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
      <table className="table-condensed">
        <tbody>
        <tr >
                <td>
                    <label>csrfmiddlewaretoken:</label>
                </td>
                <td>
                    <input type="text" id="csrfmiddlewaretoken"  defaultValue={csrf_token}
                    ></input>
                </td>
          </tr>
          <tr>
                <td>
                    <label>用户名:</label>
                </td>
                <td>
                    <input type="text" id="username"  value={this.state.name}
                    onChange={this.handleNameChange}
                    ></input>
                </td>
          </tr>
          <tr>
                <td>
                    <label>密码:</label>
                </td>
                <td>
                    <input type="text" id="password"  value={this.state.pwd}
                    onChange={this.handlePwdChange}
                    ></input>
                </td>
          </tr>
        </tbody>
        </table>
        <input type="submit" value="save" />
      </form>
    );
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserComponent user="mahongquan"></UserComponent>
        <p></p>
        <p></p>
        <p></p>
        <div id="login_form" hidden="true"></div>
      </div>
    );
  }
}

export default App;
