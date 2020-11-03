import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField} from '@material-ui/core';
import firebase from '../Config/fire';
import {connect} from 'react-redux';
import {LoadItem, LoadAccount, LoadCustomer} from '../ReduxStore/Action/action';
import Autocomplete from '@material-ui/lab/Autocomplete';

class CheckCollect extends React.Component{


componentDidMount(){
  this.props.LoadMyAccount();
  this.props.LoadMyCustomer();
  
}

constructor(){
super();
this.state={
DrawnAcc:"",
Customer:"",
CheckNum:"",
Amount:"",
ClearDate:"",
Date:new Date()
}

}

MyAccount=[]
MyCustomer=[]

DatePick(e){
var Mydate = e.target.value;
var YearPick = Mydate[0]+Mydate[1]+Mydate[2]+Mydate[3]
var MonthPick = (Mydate[5]+Mydate[6])
MonthPick = Number(MonthPick-1)
var DatePick = Mydate[8]+Mydate[9]
Mydate = new Date(YearPick,MonthPick,DatePick)
this.setState({ClearDate:Mydate})
// console.log(Mydate)
}

AddMe(){
  // alert(this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear())
// console.log(this.props.MyItems)
if(this.state.DrawnAcc,this.state.Customer,this.state.CheckNum,this.state.Amount,
  this.state.ClearDate != ""){

  firebase.database().ref('/CheckCollect').push({
  DrawnName:this.state.DrawnAcc.Name,
  DrawnID:this.state.DrawnAcc.MyId,
  CustomerName:this.state.Customer.Name,
  CustomerID:this.state.Customer.MyId,
  CheckNum:this.state.CheckNum,
  Amount:this.state.Amount,
  Status:"Pending",
  AddBy:"Admin",
  ClearDate:this.state.ClearDate.getDate()+"/"+(this.state.ClearDate.getMonth()+1)+"/"+this.state.ClearDate.getFullYear(),
  AddOn:this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear(),
   })
    // this.setState({Item:"",Brand:"",OpenBalnce:0})
   
// this.props.LoadMyItem();

}
else{
  alert("Please Fill Required Fields")
}

}


componentWillReceiveProps(newprops){
    if(newprops.MyAccounts!=this.props.MyAccounts){
        this.MyAccount=newprops.MyAccounts;
        this.setState({DataRec:"YES"})
    }
    if(newprops.MyCustomers!=this.props.MyCustomers){
        this.MyCustomer=newprops.MyCustomers;
        this.setState({DataRec:"YES"})
    }
    }

render(){
//     if(03/03/2020 === "3/3/2020"){
// alert("aaaa")
//     }
return(

<div>


<form className="AddItem" noValidate autoComplete="off">
    <h1>Check Collection</h1>
  <Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyAccount}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  onChange={(e,value)=>{
    this.setState({DrawnAcc:value}) 
  }}
  renderInput={params => <TextField {...params} label="Drawn A/C" variant="outlined" />}
/><br /><br />
<Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyCustomer}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  onChange={(e,value)=>{
    this.setState({Customer:value}) 
  }}
  renderInput={params => <TextField {...params} label="Customer Name" variant="outlined" />}
/><br /><br /> 
<TextField id="outlined-basic" onChange={(e)=>this.setState({CheckNum:e.target.value})}
  value={this.state.Item}  label="Check # " variant="outlined" /> <br /><br />
  {/* <TextField id="outlined-basic" onChange={(e)=>this.setState({Brand:e.target.value})}
  value={this.state.Brand} label="Clear Date( DD/MM/YYYY )" variant="outlined" /> <br /><br /> */}
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Amount:e.target.value})}
  value={this.state.OpenBalnce} label="Amount" variant="outlined" /><br /><br />
  <label>Clear Date : 
  <input type="date" onChange={(e)=>this.DatePick(e)} /></label><br /><br />

<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      COLLECT
</Button>
    <br />
<Button variant="contained" color="secondary"
  onClick={()=>this.props.history.push('/')} >
      Close
</Button>
<br />

</form><br /><br />
</div>
)
}
}


function mapStateToProps(state){
  return({
    MyAccounts:state.MyReducer.MyAccounts,
    MyCustomers:state.MyReducer.MyCustomers,
  })
  }
  
  function mapDispatchToProps(dispatch){
  return({
      LoadMyAccount:()=>{
          dispatch(LoadAccount())
      },
      LoadMyCustomer:()=>{
        dispatch(LoadCustomer())
    },
  
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(CheckCollect);
  
  