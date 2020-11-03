import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField,CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {LoadCustomer} from '../ReduxStore/Action/action';
import {AddCustomer} from '../ReduxStore/Action/AddingAction';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoadingProgress from './Helpers/LoadingProgress';


class AddNewCustomer extends React.Component{


componentDidMount(){
  this.props.LoadMyCustomer();  
}

constructor(){
super();
this.state={
Name:"",
Phone:"",
Address:"",
OpenBalnce:0,
Date:new Date(),
Loading:'false',
LastAdd:{ }
}

}

MyCustomers=[
  {
      Name:"Loading"
  }
]


AddMe(){
var MyDate = this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear();
if(this.state.Name,this.state.Address,this.state.Phone != ""){
this.props.AddMyCustomer(this.state.Name,this.state.Address,this.state.Phone,this.state.OpenBalnce,"Admin"
 ,MyDate)
this.setState({LastAdd:{Name:this.state.Name,Address:this.state.Address},Loading:true})
// this.setState({Loading:true})
}
else{
  alert("Please Fill Required Fields")
}
}

componentWillReceiveProps(newprops){
  if(newprops.MyCustomers!=this.props.MyCustomers){
      this.MyCustomers=newprops.MyCustomers;
      if(this.state.Loading===true){
        if(newprops.MyCustomers[newprops.MyCustomers.length-1].Name===this.state.LastAdd.Name 
          && newprops.MyCustomers[newprops.MyCustomers.length-1].Address===this.state.LastAdd.Address){
            this.setState({Loading:false})
          } 
      }
    }
  }
  

render(){ 
//  this.MyCustomers=this.props.MyCustomers
return(

<div>
<form className="AddItem" noValidate autoComplete="off">
    <h1>ADD CUSTOMER</h1>

  <CircularProgress color="primary" className={this.state.Loading===true ? "MyLoader" : "NonActive"} />

  <Autocomplete
  className="CheckData"
  id="combo-box-demo"
  options={this.MyCustomers}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  renderInput={params => <TextField {...params} label="Check Ragistered Customer" variant="outlined" />}
/> 

  <TextField id="outlined-basic" onChange={(e)=>this.setState({Name:e.target.value})}
   label="Name" value={this.state.Name} variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Address:e.target.value})}
   label="Address" value={this.state.Address} variant="outlined" /> <br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Phone:e.target.value})}
   label="Phone" value={this.state.Phone} type="number" variant="outlined" /><br /><br />
  <TextField id="outlined-basic" type="number" onChange={(e)=>this.setState({OpenBalnce:e.target.value})}
   label="Open. Balance( Receivable )" value={this.state.OpenBalnce} variant="outlined" /><br />
<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      ADD CUSTOMER
</Button><br />
<Button variant="contained" color="secondary"
  onClick={()=>this.props.history.push('/')} >
      Close
</Button>
</form><br /><br />
</div>
)
}
}

function mapStateToProps(state){
  return({
    MyCustomers:state.MyReducer.MyCustomers
  })
  }
  
function mapDispatchToProps(dispatch){
  return({
      LoadMyCustomer:()=>{
          dispatch(LoadCustomer())
      },
      AddMyCustomer:(Name,Address,Phone,Opening,AddBy,AddOn)=>{
          dispatch(AddCustomer(Name,Address,Phone,Opening,AddBy,AddOn))
      }
    }
    )
}
  
export default connect(mapStateToProps,mapDispatchToProps)(AddNewCustomer);