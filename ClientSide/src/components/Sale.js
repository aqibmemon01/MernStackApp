import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField,InputAdornment} from '@material-ui/core';
import {connect} from 'react-redux';
import firebase from '../Config/fire';
import {LoadItem,LoadCustomer,LoadPurchase} from '../ReduxStore/Action/action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../CSS/MyCSS.css'


class Sale extends React.Component{


componentDidMount(){
  this.props.LoadMyItem();
  this.props.LoadMyCustomer();
  this.props.LoadPurchase();
  
}

constructor(){
super();
this.state={
Weigth:0,
Rate:0,
Amount:0,
Expences:0,
OwnID:"",
chk:"",
Date:new Date(),
MyCost:0,
MyProfit:0,
MyNetProfit:"",
CustomerStatus:{Balance:""},
PurchaseStatus:{AvailableStock:"",Item:""},
}

}

Purchases = [];
MyCustomers = [];


CalAmountW(e){
  this.setState({Weigth:e.target.value},()=>{
    if(this.state.MyCost!==0){
      this.setState({MyProfit:(this.state.Rate-this.state.MyCost)*this.state.Weigth})  
    }
  })

  if(this.state.Rate!=0){
      this.setState({Amount:e.target.value*this.state.Rate})
  }
}
CalAmountR(e){
  this.setState({Rate:e.target.value},()=>{
    if(this.state.MyCost!==0){
      this.setState({MyProfit:(this.state.Rate-this.state.MyCost)*this.state.Weigth})
    }
  })

  if(this.state.Weigth!=0){
     this.setState({Amount:this.state.Weigth*e.target.value})
     }
}

CalculateCost(){
   var CostPrice = (Number(this.state.PurchaseStatus.Amount)+Number(this.state.PurchaseStatus.Expences))/
      Number(this.state.PurchaseStatus.Weigth)
      this.setState({MyCost:CostPrice})
}

GetPurchase(value){
   if(value!=null){
      this.setState({PurchaseStatus:value},()=>this.CalculateCost())
   }
   else {
       this.setState({PurchaseStatus:{AvailableStock:"",Item:""},MyCost:0}) 
      }
}

AddMe(){
  if(this.state.PurchaseStatus.AvailableStock != "" &&
      this.state.OwnID != "" && this.state.CustomerStatus.Balance != "" 
      && this.state.Amount != 0){
        // PURCHASE RECORD
    firebase.database().ref('/Sale').push({
      Item : this.state.PurchaseStatus.Item,
      ItemID : this.state.PurchaseStatus.ItemID,
      Customer : this.state.CustomerStatus.Name,
      CustomerID : this.state.CustomerStatus.MyId,
      Weigth : this.state.Weigth,
      SaleRate : this.state.Rate,
      CostRate : this.state.MyCost,
      NetProfit : this.state.MyProfit-this.state.Expences,
      Amount : this.state.Amount,
      IdentifyID : this.state.OwnID,
      Expences : this.state.Expences,
      AddBy:"Admin",
      AddOn:this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear()
     }).then((val)=>{
      // RECEIVABLE
     firebase.database().ref('/Receivable/'+this.state.CustomerStatus.MyId).push({
       ID:val.key,
       Amount:this.state.Amount
       })
      // ITEM HISTORY
      firebase.database().ref('/ItemHistory/'+this.state.PurchaseStatus.ItemID+'/Sale').push({
        ID:val.key,
        Weigth:this.state.Weigth
        })
       // RECEIVABLE UPDATE
     firebase.database().ref('/MyCustomer/'+this.state.CustomerStatus.MyId+'/Balance').set(
         Number(this.state.CustomerStatus.Balance)+Number(this.state.Amount)    
        )
       // PURCHASE STOCK UPDATE
      firebase.database().ref('/Purchase/'+this.state.PurchaseStatus.MyId+'/AvailableStock').set(
        Number(this.state.PurchaseStatus.AvailableStock)-Number(this.state.Weigth)    
       )
      // STOCK UPDATE
     this.props.MyItems.map((val)=>{
      if(val.MyId===this.state.PurchaseStatus.ItemID){
        firebase.database().ref('/MyItems/'+this.state.PurchaseStatus.ItemID+'/Stock').set(
          Number(val.Stock)-Number(this.state.Weigth)    
         )
         this.props.history.push('/MyItems')
        }   
  })
})
        
         
      
    }
    else{
      alert("Please Fill All Required Fields")
    } 

}

componentWillReceiveProps(newprops){
  if(newprops.MyCustomers!=this.props.MyCustomers){
      this.MyCustomers=newprops.MyCustomers;      
  }
  if(newprops.Purchases!=this.props.Purchases){
    this.Purchases=newprops.Purchases;      
  }
  }
  

render(){
//   this.MyItems=this.props.MyItems;
  this.MyCustomers=this.props.MyCustomers;
  this.Purchases=this.props.Purchases;
  return(

<div>


    <h1>SALE</h1>

<TextField id="outlined-basic" onChange={(e)=>this.state.OwnID=e.target.value}
   label="Identify ID" variant="outlined" />   

<Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.Purchases}
  getOptionLabel={option => option.IdentifyID}
  style={{ width: 300 }}
  onChange={(e,value)=>this.GetPurchase(value)}
  renderInput={params => <TextField {...params} label="Against Purchase" variant="outlined" />}
/> 

<Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyCustomers}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  onChange={(e,value)=>{
   if(value!=null)this.setState({CustomerStatus:value})
   else{ this.setState({CustomerStatus:{Balance:""}}) }
   }}
  renderInput={params => <TextField {...params} label="Customer" variant="outlined" />}
/><br /><br />
{/* <Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyItems}
  getOptionLabel={option => option.Item}
  style={{ width: 300 }}
  onChange={(e,value)=>this.setState({ItemStatus:value})} 
  renderInput={params => <TextField {...params}  label="Item" variant="outlined" />}
/><br /><br /> */}
<TextField id="outlined-basic" onBlur={(e)=>this.state.Name=e.target.value}
   label="Quantity" variant="outlined" />   
<TextField id="outlined-basic" onBlur={(e)=>this.CalAmountW(e)}
   label="Weigth(Lbs.)" variant="outlined" />
<TextField id="outlined-basic" onBlur={(e)=>this.CalAmountR(e)}
   label="Rate" variant="outlined" />   
<TextField id="outlined-basic" 
   label="Amount" value={this.state.Amount} disabled variant="outlined" /><br /><br />
<TextField id="outlined-basic"  onBlur={(e)=>this.setState({Expences:e.target.value},()=>{
  this.setState({MyNetProfit:this.state.MyProfit-this.state.Expences})
})}
   label="Other Expences" variant="outlined" />
<br />
<br />

<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      SALE
</Button>
    <br />
<Button variant="contained" color="secondary"
  onClick={()=>this.props.history.push('/')} >
      Close
</Button>

<br /><br />
  <span>Item : {this.state.PurchaseStatus.Item}</span><br />
  <span>Available Stock : {this.state.PurchaseStatus.AvailableStock}</span><br />
  <span>Cost Rate : {this.state.MyCost}</span><br />
  <span>Gross Profit : {this.state.MyProfit}</span><br />
  <span>Net Profit : {this.state.MyNetProfit}</span>
</div>
)
}

}

function mapStateToProps(state){
  return({
    MyItems:state.MyReducer.MyItems,
    MyCustomers:state.MyReducer.MyCustomers,
    Purchases:state.MyReducer.Purchases,
  })
  }
  
function mapDispatchToProps(dispatch){
  return({
      LoadMyItem:()=>{
          dispatch(LoadItem())
      },
      LoadMyCustomer:()=>{
        dispatch(LoadCustomer())
      },
      LoadPurchase:()=>{
        dispatch(LoadPurchase())
      }, 
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Sale);
  
  