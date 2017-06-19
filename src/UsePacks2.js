
import React from 'react';
import Client from './Client';
import {Table} from "react-bootstrap";
import UsePackEdit from "./UsePackEdit";
import Autocomplete from './Autocomplete'
let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}
class UsePacks2 extends React.Component {
  state = {
    usepacks: [],
    showRemoveIcon: false,
    newPackName: '',
          auto_value: '',
      auto_items:[],
      auto_loading: false,
  };
  componentDidMount=()=> {
      Client.UsePacks(this.props.contact_id, (usepacks) => {
        this.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  };
  auto_change=(event, value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
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
        <UsePackEdit parent={this} index={idx} title="编辑" />
        <button  className="usepack_delete" onClick={() => this.onDeleteClick(usepack.id)}>删除</button>
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
        <div>
          <Autocomplete
          inputProps={{ id: 'states-autocomplete' }}
          ref="autocomplete"
          value={this.state.auto_value}
          items={this.state.auto_items}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            // set the menu to only the selected item
            console.log("selected");
            console.log(item);
            this.setState({auto_value:value, auto_items: [ item ] })
            // or you could reset it to a default list again
            // this.setState({ unitedStates: getStates() })
          }}
          onChange={this.auto_change
          }
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.id}
              id={item.id}
            >{item.name}</div>
          )}
        />
          <button  id="id_bibei_usepack">必备</button>
        </div>
      <div>新包名称：
        <input id="new_pack1"  placeholder="新包" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button className="btn btn-info" id="id_new_usepack" onClick={this.new_pack}>新包</button>
      </div>
      </div>
    );
  }
}
export default UsePacks2;
