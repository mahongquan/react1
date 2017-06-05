import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Client from './Client';
const MATCHING_ITEM_LIMIT = 25;
export default class UserComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      logined:false,
      user:"mahongquan",
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };
  handleLogin = () => {
  	console.log("login");
    var value="马红权";
    Client.search(value, (foods) => {
        console.log(foods);
        // this.setState({
        //   foods: foods.slice(0, MATCHING_ITEM_LIMIT),
        // });
    });
    this.setState({
      logined: true,
    });
  };
  handleLogout = () => {
  	console.log("logout");
    this.setState({
      logined: false,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
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
            <MenuItem primaryText="登录" disabled={this.state.logined} onTouchTap={this.handleLogin} />
            <MenuItem primaryText="注销" disabled={!this.state.logined} onTouchTap={this.handleLogout} />
          </Menu>
        </Popover>
      </div>
    );
  }
}