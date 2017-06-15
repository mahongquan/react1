
import React from 'react';
import Client from './Client';
import {Table} from "react-bootstrap";
class UsePacks2 extends React.Component {
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
      <tr
        key={idx}
      >
        <td >{food.id}</td>
        <td >{food.name}</td>
        <td >{food.contact}</td>
        <td >{food.pack}</td>
        <td >{food.hetongbh}</td>
      </tr>
    ));

    return (
        <Table  responsive bordered condensed>
          <thead>
             <tr>
              <td>id</td>
              <td>name</td>
              <td>contact</td>
              <td>pack</td>
              <td>hetongbh</td>
            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
        </Table>
    );
  }
}
export default UsePacks2;
