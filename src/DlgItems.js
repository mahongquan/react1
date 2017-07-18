import React, { Component } from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
import {NavItem,Table} from "react-bootstrap";
class DlgItems extends Component {
  mystate = {
    start:0,
    limit:5,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
      contacts: [],
      user: "AnonymousUser",
      start:0,
      total:0,
      search:"",
      start_input:1,
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata();
  }
  loaddata=()=>{
   Client.get("/rest/Item",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts2) => {
        var user=contacts2.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts2.total,
          start:this.mystate.start
        });
        this.mystate.total=contacts2.total;
    });
  }
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };
  render=()=>{
      const contactRows = this.state.contacts.map((contact, idx) => (
      <tr key={idx} >
        <td>{contact.id}</td>
        <td>{contact.bh}</td>
        <td>{contact.name}</td>
        <td>{contact.guige}</td>
        <td>{contact.danwei}</td>
        <td><img alt="no" src={"/media/"+contact.image} width="100" height="100"></img></td>
      </tr>
    ));

    return (
        <NavItem eventKey={4} href="#" onClick={this.open}>备件
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>备件</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Table responsive bordered condensed><thead>
           <tr>
           <th>ID</th>
           <th>编号</th>
           <th>名称</th>
           <th>规格</th>
           <th>单位</th>
           <th>图片</th>
           </tr></thead><tbody id="contact-list">{contactRows}</tbody></Table>
      <a onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}/{this.state.total}</label>
      <a onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
          </Modal.Body>
        </Modal>
        </NavItem>
    );
  }
};
export default DlgItems;