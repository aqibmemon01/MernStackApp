import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField,CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {LoadVender} from '../ReduxStore/Action/action';
import {AddVender} from '../ReduxStore/Action/AddingAction';
import Autocomplete from '@material-ui/lab/Autocomplete';


class AddNewVender extends React.Component{


componentDidMount(){
// Decision Data Loading
if(this.props.MyVenders.length===0){
  this.props.LoadMyVender();
}
else{
  this.MyVenders=this.props.MyVenders
  this.setState({Checking:this.state.Checking})
}
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
LastAdd:{ },
Checking:""

}

}

MyVenders=[
  {
      Name:"Loading"
  }
]


AddMe(){
  var MyDate = this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear();
  if(this.state.Name,this.state.Address,this.state.Phone != ""){
  this.props.AddMyVender(this.state.Name,this.state.Address,this.state.Phone,this.state.OpenBalnce,"Admin"
   ,MyDate)
  this.setState({LastAdd:{Name:this.state.Name,Address:this.state.Address},Loading:true})
  // this.setState({Loading:true})
  }
  else{
    alert("Please Fill Required Fields")
  }

// // if(this.state.Name,this.state.Address,this.state.Phone != ""){

// //   firebase.database().ref('/MyVender').push({
// //   Name:this.state.Name,
// //   Address:this.state.Address,
// //   Phone:this.state.Phone,
// //   Balance:this.state.OpenBalnce,
// //   AddBy:"Admin",
// //   AddOn:this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear(),
// //    }).then((val)=>{
// //     firebase.database().ref('/Payable/'+val.key+'/Opening').set({
// //       ID:"Opening",
// //       Amount:this.state.OpenBalnce
// //   })
// //   this.setState({Name:"",Address:"",Phone:"",OpenBalnce:0})
// //  })
// // this.props.LoadMyVender();

// }
// else{
//   alert("Please Fill Required Fields")
// }
}

componentWillReceiveProps(newprops){
  if(newprops.MyVenders!=this.props.MyVenders){
      this.MyVenders=newprops.MyVenders;
      if(this.state.Loading===true){
        if(newprops.MyVenders[newprops.MyVenders.length-1].Name===this.state.LastAdd.Name 
          && newprops.MyVenders[newprops.MyVenders.length-1].Address===this.state.LastAdd.Address){
            this.setState({Loading:false})
          } 
      }
    }
  }

render(){ 
//  this.MyVenders=this.props.MyVenders
return(

<div>


<form className="AddItem" noValidate autoComplete="off">
    <h1>ADD VENDER</h1>

    <CircularProgress color="primary" className={this.state.Loading===true ? "MyLoader" : "NonActive"} />

  <Autocomplete
  className="CheckData"
  id="combo-box-demo"
  options={this.MyVenders}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  renderInput={params => <TextField {...params} label="Check Ragistered Venders" variant="outlined" />}
/> 

  <TextField id="outlined-basic" onChange={(e)=>this.setState({Name:e.target.value})}
   label="Name" value={this.state.Name} variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Address:e.target.value})}
   label="Address" value={this.state.Address} variant="outlined" /> <br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Phone:e.target.value})}
   label="Phone" value={this.state.Phone} variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({OpenBalnce:e.target.value})}
   label="Open. Balance( A/C Payable )" value={this.state.OpenBalnce} variant="outlined" /><br />

<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      ADD VENDER
</Button>
    <br />
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
    MyVenders:state.MyReducer.MyVenders
  })
  }
  
  function mapDispatchToProps(dispatch){
  return({
      LoadMyVender:()=>{
          dispatch(LoadVender())
      },
      AddMyVender:(Name,Address,Phone,Opening,AddBy,AddOn)=>{
          dispatch(AddVender(Name,Address,Phone,Opening,AddBy,AddOn))
      }
  
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddNewVender);