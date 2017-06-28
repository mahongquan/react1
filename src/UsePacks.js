
import React from 'react';
import Client from './Client';
import { Table, TableBody, TableHeader,TableRowColumn,  TableRow, } from 'material-ui/Table';
class UsePacks extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
  };
  componentDidMount=()=> {
      var self=this;
      Client.UsePacks(this.props.contact_id, (foods) => {
        self.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
        console.log(foods);
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
      <TableRow key={idx} onClick={() => this.props.onFoodClick(food)}>
        <TableRowColumn>{food.id}</TableRowColumn>
        <TableRowColumn>{food.name}</TableRowColumn>
        <TableRowColumn>{food.contact}</TableRowColumn>
        <TableRowColumn>{food.pack}</TableRowColumn>
        <TableRowColumn>{food.hetongbh}</TableRowColumn>
      </TableRow>
    ));

    return (
        <Table>
        <TableBody>
        <TableRow>
          <TableRowColumn>id</TableRowColumn>
          <TableRowColumn>name</TableRowColumn>
          <TableRowColumn>contact</TableRowColumn>
          <TableRowColumn>pack</TableRowColumn>
          <TableRowColumn>hetongbh</TableRowColumn>
        </TableRow>
        {foodRows}
        </TableBody>
        </Table>
    );
  }
}
export default UsePacks;
