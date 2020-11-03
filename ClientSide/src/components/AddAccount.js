import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField,CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import { LoadAccount} from '../ReduxStore/Action/action';
import { AddAccount} from '../ReduxStore/Action/AddingAction';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Toast from './Helpers/Toast'

class AddNewAccount extends React.Component{


componentDidMount(){
  this.props.LoadMyAccount();
  
}

constructor(){
super();
this.state={
AccName:"",
OpenBalnce:0,
Date:new Date(),
Loading:'false',
Success:false,
LastAdd:{ }

}

}

MyAccounts=[
  {
      Item:"Loading"
  }
]


AddMe(){
  var MyDate = this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear();
  if(this.state.AccName != ""){
  this.props.AddMyAccount(this.state.AccName,this.state.OpenBalnce,"Admin"
   ,MyDate)
  this.setState({LastAdd:{Name:this.state.AccName},Loading:true})
  // this.setState({Loading:true})
  }
  else{
    alert("Please Fill Required Fields")
  }
  }
  
componentWillReceiveProps(newprops){
  if(newprops.MyAccounts!=this.props.MyAccounts){
      this.MyAccounts=newprops.MyAccounts;
      if(this.state.Loading===true){
        if(newprops.MyAccounts[newprops.MyAccounts.length-1].Name===this.state.LastAdd.Name){
            this.setState({Loading:false,Success:true,AccName:"",OpenBalnce:0})
       
          } 
      }
    }
  }
Success(){
 this.state.Success=false
  return(
    <Toast msg={this.state.LastAdd.Name} />
  )
}

  
render(){
  // alert(this.props.MyAccounts[this.props.MyAccounts.length-1].Name)
  //  this.MyAccounts=this.props.MyAccounts
return(

<div>
{this.state.Success ? this.Success() : ""}

<CircularProgress color="primary" className={this.state.Loading===true ? "MyLoader" : "NonActive"} />
<form className="AddItem" noValidate autoComplete="off">
<Autocomplete
  className="CheckData"
  id="combo-box-demo"
  options={this.MyAccounts}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  renderInput={params => <TextField {...params} label="Check Ragistered Accounts" variant="outlined" />}
/> 
    <h1>ADD ACCOUNT</h1>
  <TextField id="outlined-basic" onChange={(e)=>this.setState({AccName:e.target.value})}
  value={this.state.AccName}  label="Account Name" variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({OpenBalnce:e.target.value})}
  value={this.state.OpenBalnce} label="Opening Balance" variant="outlined" /><br />

<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      ADD A/C
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
    MyAccounts:state.MyReducer.MyAccounts
  })
  }
  
  function mapDispatchToProps(dispatch){
  return({
      LoadMyAccount:()=>{
          dispatch(LoadAccount())
      },
      AddMyAccount:(Name, Opening, AddBy, AddOn)=>{
        dispatch(AddAccount(Name, Opening, AddBy, AddOn))
    }
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddNewAccount);
  
  