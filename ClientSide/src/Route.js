import React, { Component } from 'react';
import { Route, Router, Link } from 'react-router-dom';
// import {MenuItem,Menu,Button} from '@material-ui/core';
import AddNew from './components/Helpers/AddNew';
import AddRecord from './components/Helpers/AddRecord';
import MyRecord from './components/Helpers/MyRecord';
import PayRec from './components/Helpers/PayRec';
import Home from './components/home';
import About from './components/about';
import history from './History';
import MyHome from './components/MyHome';
import AddItem from './components/AddItem';
import AddAccount from './components/AddAccount';
import AddCustomer from './components/AddCustomer';
import AddVender from './components/AddVender';
import Purchase from './components/Purchase';
import Sale from './components/Sale';
import MyItems from './components/Detail/MyItem';
import MyVenders from './components/Detail/MyVender';
import MyPurchase from './components/Detail/MyPurchase';
import SinglePurchaseR from './components/Detail/Reports/SinglePurchase';
import MyCustomer from './components/Detail/MyCustomer';
import CheckCollet from './components/CheckCollet';
import EditItem from './components/Editors/EditItem';




class Routers extends Component {
constructor(){
super();
this.state={
    // anchorEl:null,
    Date: new Date

}    
}
MyDate = new Date
render() {
        return (
   <div>
   <div className="topnav">
            <a class="active">Home</a>
            <a ><AddNew /></a>
            <a ><AddRecord /></a>
            <a ><MyRecord /></a>
            <a ><PayRec /></a>
            <a >LogOut</a>
             <span>{this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear()}</span>
             <span>AL-HABIB TWISTING</span>

        </div>

    <Router history={history}>
                 <div>


                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/" component={MyHome} />
                    
                    <Route exact path="/AddItem" component={AddItem} />
                    <Route exact path="/AddAccount" component={AddAccount} />
                    <Route exact path="/AddCustomer" component={AddCustomer} />
                    <Route exact path="/AddVender" component={AddVender} />

                    <Route exact path="/Purchase" component={Purchase} />
                    <Route exact path="/Sale" component={Sale} />
                    
                    <Route exact path="/MyItems" component={MyItems} />
                    <Route exact path="/MyVenders" component={MyVenders} />
                    <Route exact path="/MyCustomers" component={MyCustomer} />
                    <Route exact path="/MyPurchase" component={MyPurchase} />
                    
                    <Route exact path="/CheckCollect" component={CheckCollet} />
                    <Route exact path="/SinglePurchase/:ID" component={SinglePurchaseR} />
                    
                    <Route exact path="/EditItem/:ItemId" component={EditItem} />
                </div>
            </Router>
         </div>
        )
    }
}

export default Routers;