
import React from 'react';
import Client from './Client';
import {Table} from "react-bootstrap";
import PackItemEdit from './PackItemEdit';
import update from 'immutability-helper';
class PackItems extends React.Component {
  state = {
    items: [],
    showRemoveIcon: false,
    newPackName: '',
  };
  componentDidMount=()=> {
      Client.PackItems(this.props.pack_id, (items) => {
        this.setState({
          items: items.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  };
  new_pack= (id) => {
    var url="/rest/Pack";
    var data={"name":this.state.newPackName};
    Client.post(url,data,(res) => {
        var p=res.data;
        this.addrow(p)
    });
  };
  handlePackItemChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.items,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({items:contacts2});
  };
  addrow=(pack1)=>{
    var url="/rest/PackItem";
    var data={contact:this.props.contact_id,name:pack1.name,pack:pack1.id};
    Client.post(url,data,(res) => {
        //todo 
    });
  };
  newpackChange=(e)=>{
    this.setState({newPackName:e.target.value});
  };
  onEditClick = (id) => {
  };
  onDeleteClick = (itemIndex) => {
    var url="/rest/PackItem";
    Client.delete1(url,{id:this.state.items[itemIndex].id},(res) => {
        const filteredFoods = this.state.items.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ items: filteredFoods });
    });
  };
  render() {
    const { items } = this.state;
    const itemRows = items.map((item, idx) => (
      <tr
        key={idx}
      >
        <td >{item.id}</td>
        <td >{item.name}</td>
        <td>{item.guige}</td>
        <td>{item.ct}</td>
        <td>{item.bh}</td>
        <td >{item.pack}</td>
        <td>
        <PackItemEdit parent={this} index={idx} title="编辑" />
        <button onClick={() => this.onDeleteClick(idx)}>删除</button>
        </td>
      </tr>
    ));

    return (
    <div>
        <Table  responsive bordered condensed>
          <thead>
             <tr>
              <td>id</td>
              <td>name</td>
              <td>guige</td>
              <td>ct</td>
              <td>bh</td>
              <td>pack</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {itemRows}
          </tbody>
        </Table>
        <p>
          <input id="auto_pack1" placeholder="输入备件" />
          <button  id="id_bibei_item">必备</button>
        </p>
      <p>新包名称：
        <input id="new_pack1"  placeholder="新备件" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button className="btn btn-info" id="id_new_item" onClick={this.new_pack}>新备件</button>
      </p>
      </div>
    );
  }
}
export default PackItems;
