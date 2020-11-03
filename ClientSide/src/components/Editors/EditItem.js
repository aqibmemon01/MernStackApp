import React from 'react';
import '../../CSS/MyCSS.css'
import {Button,TextField,CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {LoadItem} from '../../ReduxStore/Action/action';


class EditItem extends React.Component{


componentDidMount(){
  this.props.MyItems.map((val)=>{
    if(this.props.match.params.ItemId===val._id){
       this.setState({Item:val.Item,Brand:val.Brand,SalePrice:val.SalePrice,OpenBalnce:val.Stock,
        AddedBy:val.AddBy,AddedOn:val.AddOn,MyRecord:val})
    }
  })
}

constructor(){
super();
this.state={
Item:"",
Brand:"",
OpenBalnce:0,
SalePrice:0,
AddedBy:"",
AddedOn:"",
MyRecord:{},
Loading:'false',

}

}



UpdateMe(){
  var CheckRepeat = true;
  
  if(this.state.Item,this.state.Brand != ""){
     this.MyItems.map((val)=>{
       if(this.state.Item===val.Item && val.Item!=this.state.MyRecord.Item){
         CheckRepeat=false
       }})
   
     if(CheckRepeat===true){
    // this.props.AddMyItem(this.state.Item,this.state.Brand,this.state.OpenBalnce,
    // this.state.SalePrice,"Admin",MyDate)
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
return(

<div>


<form className="AddItem" noValidate autoComplete="off">

<CircularProgress color="primary" className={this.state.Loading===true ? "MyLoader" : "NonActive"} />

    <h1>UPDATE ITEMS</h1>
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Item:e.target.value})}
  value={this.state.Item}  label="Item" variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({Brand:e.target.value})}
  value={this.state.Brand} label="Brand" variant="outlined" /> <br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({SalePrice:e.target.value})}
  value={this.state.SalePrice} label="Sale Price" variant="outlined" /><br /><br />
  <TextField id="outlined-basic" onChange={(e)=>this.setState({OpenBalnce:e.target.value})}
  value={this.state.OpenBalnce} label="Opening Balance (Lbs)" variant="outlined" /><br />

<Button variant="contained" color="primary"
  onClick={()=>this.UpdateMe()} >
      UPDATE
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
      }
  
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditItem);
  
  