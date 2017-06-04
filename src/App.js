import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Client from './Client';
//import  UserComponent from "./UserComponent";
import LoginFormComponent from "./LoginFormComponent";
import DialogExampleSimple from "./DialogExampleSimple"
//import Cookies from 'universal-cookie';
injectTapEventPlugin();
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';
//var csrf_token="";
var user="";
class App extends Component {
  state = {
    user: null,
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
    open: false,
    logined:false,
    user:"AnonymousUser",
    //csrf_token:"",
  }
  componentDidMount=()=> {
      Client.contacts("", (foods) => {
        this.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
          user:foods.user,
        });
        if (user==="AnonymousUser"){
        this.setState({
          logined:false
        });
        }
        else{
            this.setState({
              logined:true
            }); 
        }
      });
  };
  onFoodClick=(food)=>{
    console.log("click row");
  };
  handleUserChange = (user) => {
    if (user==="AnonymousUser"){
        this.setState({
          logined:false
        });
    }
    else{
        this.setState({
          logined:true
        }); 
    }
    this.setState({
          user:user,
          foods: [],//slice(0, MATCHING_ITEM_LIMIT),
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
    var data={username:"mahongquan",password:"333333"};
    this.onLoginSubmit(data);
  };
  handleLogin = () => {
    console.log("login");
    Client.login_index( (data) => {
        //console.log(data.csrf_token);
        // const cookies = new Cookies();

        // cookies.set('csrftoken', this.state.csrf_token, { path: '/' });
        this.showlogin();
    });
    
  };
  handleLogout = () => {
    console.log("logout");
    Client.logout( (data) => {
       console.log("logout"+data);
       this.setState({
          logined: false,
          user:"AnonymousUser",
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
        foods: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.contacts(value, (foods) => {
        this.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login( data.username,data.password,(res) => {
      if (res.success){
        this.setState({
          logined: true,
        });
        this.setState({user:data.username});
        this.handleUserChange(this.state.user);
      }
    });
  };
  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    const foodRows = foods.map((food, idx) => (
      <TableRow
        key={idx}
        onClick={() => this.onFoodClick(food)}
      >
        <TableRowColumn>{food.yiqibh}</TableRowColumn>
        <TableRowColumn>{food.hetongbh}</TableRowColumn>
        <TableRowColumn>{food.yonghu}</TableRowColumn>
        <TableRowColumn>{food.baoxiang}</TableRowColumn>
        <TableRowColumn>{food.yiqixinghao}</TableRowColumn>
      </TableRow>
    ));
    return (
      <div className="App">
        <MuiThemeProvider>
         <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="备件" />
          <TextField
                      id="id_search"
                      type='text'
                      placeholder='Search device...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    >
          </TextField>
          <div>
        <RaisedButton  onTouchTap={this.handleTouchTap}
          label={this.state.user}>
          <span className="caret"> </span>
        </RaisedButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
              
            <MenuItem primaryText="注销" disabled={!this.state.logined} onTouchTap={this.handleLogout} />
          </Menu>

        </Popover>
       </div>
        </ToolbarGroup>
               <MuiThemeProvider>
                <DialogExampleSimple title="登录" disabled={this.state.logined}  onLoginSubmit={this.onLoginSubmit}>
                </DialogExampleSimple>
              </MuiThemeProvider>
      </Toolbar>
        </MuiThemeProvider>
        <div id='food-search'>
    <MuiThemeProvider>
        <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>仪器编号</TableHeaderColumn>
        <TableHeaderColumn>合同编号</TableHeaderColumn>
        <TableHeaderColumn>用户单位</TableHeaderColumn>
        <TableHeaderColumn>仪器型号</TableHeaderColumn>
      </TableRow>
    </TableHeader>
         <TableBody>
            {foodRows}
          </TableBody>
        </Table>
    </MuiThemeProvider>
      </div>
      </div>
    );
  }
}
export default App;
