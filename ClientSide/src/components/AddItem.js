import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField,CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {LoadItem} from '../ReduxStore/Action/action';
import {AddItem} from '../ReduxStore/Action/AddingAction';

import Autocomplete from '@material-ui/lab/Autocomplete';


class AddNewItems extends React.Component{


componentDidMount(){
// Decision Data Loading
if(this.props.MyItems.length===0){
  this.props.LoadMyItem();
}
else{
  this.MyItems=this.props.MyItems
  this.setState({Checking:this.state.Checking})
}
}

constructor(){
super();
this.state={
Item:"",
Brand:"",
OpenBalnce:0,
SalePrice:0,
Date:new Date(),
Loading:'false',
LastAdd:{ },
Checking:""

}

}

MyItems=[
  {
      Item:"Loading"
  }
]


AddMe(){
var CheckRepeat = true;
var MyDate = this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear();

if(this.state.Item,this.state.Brand != ""){
   this.MyItems.map((val)=>{
     if(this.state.Item===val.Item){
       CheckRepeat=false
     }})
 
   if(CheckRepeat===true){
  this.props.AddMyItem(this.state.Item,this.state.Brand,this.state.OpenBalnce,
  this.state.SalePrice,"Admin",MyDate)
  this.setState({LastAdd:{Item:this.state.Item},Loading:true})
}
   else{
     alert("YOUR ENTERED ITEM IS ALREADY AVAILABLE ")
   }
}
else{
  alert("Please Fill Required Fields")
}
}

componentWillReceiveProps(newprops){
  if(newprops.MyItems!=this.props.MyItems){
      this.MyItems=newprops.MyItems;
      if(this.state.Loading===true){
        if(newprops.MyItems[newprops.MyItems.length-1].Item===this.state.LastAdd.Item ){
            this.setState({Loading:false,Item:"",Brand:"",OpenBalnce:0,SalePrice:0})
          } 
      }
    }
  }


render(){
//  this.MyItems=this.props.MyItems
return(

<div>


<form className="AddItem" noValidate autoComplete="off">

<CircularProgress color="primary" className={this.state.Loading===true ? "MyLoader" : "NonActive"} />

<Autocomplete
  className="CheckData"
  id="combo-box-demo"
  options={this.MyItems}
  getOptionLabel={option => option.Item}
  style={{ width: 300 }}
  renderInput={params => <TextField {...params} label="Check Ragistered Items" variant="outlined" />}
/> 
    <h1>ADD ITEMS</h1>
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Item:e.target.value})}
  value={this.state.Item}  label="Item" variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Brand:e.target.value})}
  value={this.state.Brand} label="Brand" variant="outlined" /> <br /><br />
  <TextField id="outlined-basic" type="number" onChange={(e)=>this.setState({SalePrice:e.target.value})}
  value={this.state.SalePrice} label="Sale Price" variant="outlined" /><br /><br />
  <TextField id="outlined-basic" type="number" onChange={(e)=>this.setState({OpenBalnce:e.target.value})}
  value={this.state.OpenBalnce} label="Opening Balance" variant="outlined" /><br />

<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      ADD ITEMS
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
    MyItems:state.MyReducer.MyItems
  })
  }
  
  function mapDispatchToProps(dispatch){
  return({
      LoadMyItem:()=>{
          dispatch(LoadItem())
      },
      AddMyItem:(Item, Brand, Opening, SalePrice, AddBy, AddOn)=>{
          dispatch(AddItem(Item, Brand, Opening, SalePrice, AddBy, AddOn))
      }
  
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddNewItems);
  
  