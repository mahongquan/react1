
import React from 'react';
import Client from './Client';
import {Table} from "react-bootstrap";
import UsePackEdit from "./UsePackEdit";
class UsePacks2 extends React.Component {
  state = {
    usepacks: [],
    showRemoveIcon: false,
    newPackName: '',
  };
  componentDidMount=()=> {
      Client.UsePacks(this.props.contact_id, (usepacks) => {
        this.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
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
  addrow=(pack1)=>{
    var url="/rest/UsePack";
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
  onDeleteClick = (id) => {
  };
  render() {
    const { usepacks } = this.state;
    const usepackRows = usepacks.map((usepack, idx) => (
      <tr
        key={idx}
      >
        <td >{usepack.id}</td>
        <td >{usepack.name}</td>
        <td >{usepack.contact}</td>
        <td >{usepack.pack}</td>
        <td >{usepack.hetongbh}</td>
        <td>
        <button className="usepack_edit" onClick={() => this.onEditClick(usepack.id)}>编辑</button>
        <button  className="usepack_delete" onClick={() => this.onDeleteClick(usepack.id)}>删除</button>
        <UsePackEdit parent={this} index={idx} title="编辑" />
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
              <td>contact</td>
              <td>pack</td>
              <td>hetongbh</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {usepackRows}
          </tbody>
        </Table>
        <p>
          <input id="auto_pack1" placeholder="输入包" />
          <button  id="id_bibei_usepack">必备</button>
        </p>
      <p>新包名称：
        <input id="new_pack1"  placeholder="新包" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button class="btn btn-info" id="id_new_usepack" onClick={this.new_pack}>新包</button>
      </p>
      </div>
    );
  }
}
export default UsePacks2;
