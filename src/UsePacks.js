
import React from 'react';
import Client from './Client';
import { Table, TableBody, TableHeader,TableHeaderColumn, TableRowColumn, TableRow, } from 'material-ui/Table';
class UsePacks extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
  };
  componentDidMount=()=> {
    if(this.props.contact_id){
      Client.UsePacks(this.props.contact_id, (usepacks) => {
        this.setState({
          foods: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
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

      Client.search(value, (foods) => {
        this.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    const foodRows = foods.map((food, idx) => (
      <TableRow
        key={idx}
        onClick={() => this.props.onFoodClick(food)}
      >
        <TableRowColumn>{food.yiqibh}</TableRowColumn>
        <TableRowColumn >{food.id}</TableRowColumn>
        <TableRowColumn >{food.name}</TableRowColumn>
        <TableRowColumn >{food.contact}</TableRowColumn>
        <TableRowColumn >{food.pack}</TableRowColumn>
        <TableRowColumn >{food.hetongbh}</TableRowColumn>
      </TableRow>
    ));

    return (
        <Table>
          <TableHeader>
             <TableRow>
              <TableHeaderColumn>id</TableHeaderColumn>
              <TableHeaderColumn>name</TableHeaderColumn>
              <TableHeaderColumn>contact</TableHeaderColumn>
              <TableHeaderColumn>pack</TableHeaderColumn>
              <TableHeaderColumn>hetongbh</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodRows}
          </TableBody>
        </Table>
    );
  }
}
export default UsePacks;
