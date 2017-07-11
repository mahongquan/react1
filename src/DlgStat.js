import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
import update from 'immutability-helper';
import {NavItem,} from "react-bootstrap";
var BarChart = require("react-chartjs").Bar;
var createReactClass = require('create-react-class');
const DlgStat = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      error:"",
      lbls:[],
      values:[],
    };
  },

  close() {
    this.setState({ showModal: false });
  },
  open() {
    var self=this;
   this.setState({ showModal: true });
   var data= { limit:10,search:"xls"};
   Client.get("/rest/month12",data, function(result){
          self.setState({lbls:result.lbls,values:result.values});
   })
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
              borderWidth: 1
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
        <NavItem eventKey={6} href="#" onClick={this.open}>统计
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>统计</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <BarChart data={data} options={options} width="600" height="300"/>
          </Modal.Body>
        </Modal>
        </NavItem>
    );
  }
});
export default DlgStat;