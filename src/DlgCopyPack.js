import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
import update from 'immutability-helper';
import {NavItem,} from "react-bootstrap";
import Autocomplete from './Autocomplete'
var BarChart = require("react-chartjs").Bar;
var createReactClass = require('create-react-class');
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

const DlgCopyPack = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
    };
  },
  newnameChange(event){
    this.setState({newname:event.target.value});
  },
  copy_pack(){
    console.log(this.src_id+" "+this.state.newname);
    var self=this;
    var data1=new FormData();
    data1.append("oldid",this.src_id);
    data1.append("newname",this.state.newname);
    Client.postForm("/rest/copypack/",data1,(result) => {
          self.setState({ error:result.message})
    });
  },
  auto_change(event, value){
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
  },
  auto_select(value, item)  {
      console.log("selected");
      console.log(item);
      //todo this.addrow(item.id);
      this.src_id=item.id;
      this.setState({auto_value:value, auto_items: [ item ] })
  },
  close() {
    this.setState({ showModal: false });
  },
  open() {
   this.setState({ showModal: true });
   this.src_id=null;
  },
  render() {
    var bg=new Array();//values.length);
    for(var i=0;i<this.state.values.length;i++){
      bg.push('rgba(95, 192, 99, 1)');
    }
    var data= {
          labels:this.state.lbls,
          datasets: [{
              label: '调试台数',
              data: this.state.values,
              backgroundColor:bg,
              borderWidth:2
          }]
      };
      console.log(data);
      var options= {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    return (
        <NavItem eventKey={5} href="#" onClick={this.open}>复制包
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>复制包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
            <tr>
              <td>
                <label for="id_from">包名称:</label>
              </td>
              <td>
                <Autocomplete
                  inputProps={{ id: 'states-autocomplete' }}
                  ref="autocomplete"
                  value={this.state.auto_value}
                  items={this.state.auto_items}
                  getItemValue={(item) => item.name}
                  onSelect={this.auto_select}
                  onChange={this.auto_change}
                  renderItem={(item, isHighlighted) => (
                    <div
                      style={isHighlighted ? styles.highlightedItem : styles.item}
                      key={item.id}
                      id={item.id}
                    >{item.name}</div>
                  )}
                />
              </td>
            </tr>
            <tr>
              <td><label for="id_to">新包名称:</label></td>
              <td>
                <input id="nameto" type="text" onChange={this.newnameChange} size="15" value={this.state.newname} maxlength="30" />
              </td>
            </tr>
            </table>
          <button onClick={this.copy_pack}>复制</button>
          <p>{this.state.error}</p>
          </Modal.Body>
        </Modal>
        </NavItem>
    );
  }
});
export default DlgCopyPack;