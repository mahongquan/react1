
import React from 'react';
import Client from './Client';
import { Table, TableBody, TableHeader, TableRowColumn, TableRow, } from 'material-ui/Table';
class UsePacks extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
  };
  componentDidMount=()=> {
      Client.UsePacks(101, (foods) => {
        this.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
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
        <TableRowColumn className='right aligned'>{food.id}</TableRowColumn>
        <TableRowColumn className='right aligned'>{food.name}</TableRowColumn>
        <TableRowColumn className='right aligned'>{food.contact}</TableRowColumn>
        <TableRowColumn className='right aligned'>{food.pack}</TableRowColumn>
        <TableRowColumn className='right aligned'>{food.hetongbh}</TableRowColumn>
      </TableRow>
    ));

    return (
      <div id='food-search'>
        <Table className='ui selectable sTableRowuctured large Table'>
          <TableHeader>
             <TableRow>
              <TableRowColumn className='eight wide'>id</TableRowColumn>
              <TableRowColumn>name</TableRowColumn>
              <TableRowColumn>contact</TableRowColumn>
              <TableRowColumn>pack</TableRowColumn>
              <TableRowColumn>hetongbh</TableRowColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default UsePacks;
