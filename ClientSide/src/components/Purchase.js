import React from 'react';
import '../CSS/MyCSS.css'
import {Button,TextField,InputAdornment} from '@material-ui/core';
import {connect} from 'react-redux';
import firebase from '../Config/fire';
import {LoadItem,LoadVender} from '../ReduxStore/Action/action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../CSS/MyCSS.css'


class Purchase extends React.Component{


componentDidMount(){
  this.props.LoadMyItem();
  this.props.LoadMyVender();
  
}

constructor(){
super();
this.state={
// Quantity:[],
// Weigth:0,
// Rate:[],
// Amount:[],
OwnID:"",
chk:"",
RequiredTable:0,
TotalAmount:0,
Date:new Date(),
RowHidden:false,
VenderStatus:{Balance:""},
ItemStatus:{Stock:""},
}
}

MyItems = [];
MyVenders = [];
TableData=[];

UpdateData(e,MyIndex,Type){
  if(Type=="Quantity"){
    this.TableData[MyIndex].Quantity=e.target.value;
  }
  else if(Type=="Rate"){
    this.TableData[MyIndex].SalePrice=e.target.value;
  }
  this.setState({chk:this.state.chk})
}

CalAmountQ(e,MyIndex){
  // this.TableData[MyIndex].Quantity=e.target.value;
  if(this.TableData[MyIndex].SalePrice!=0){
      this.TableData[MyIndex].Amount = this.TableData[MyIndex].Quantity * this.TableData[MyIndex].SalePrice
      
      var Total = 0;
      this.TableData.map((val)=>{
       Total+=val.Amount;
      })
      this.setState({TotalAmount:Total})
    }
  else{
    this.setState({TotalAmount:this.state.TotalAmount})
  }
}
CalAmountR(e,MyIndex){
  // this.TableData[MyIndex].SalePrice=e.target.value;
  if(this.TableData[MyIndex].Quantity!=0){
      this.TableData[MyIndex].Amount = this.TableData[MyIndex].Quantity * this.TableData[MyIndex].SalePrice
      
      var Total = 0;
      this.TableData.map((val)=>{
       Total+=val.Amount;
      })
      this.setState({TotalAmount:Total})
    }
    else{
      this.setState({TotalAmount:this.state.TotalAmount})
    }
}

// AddMe(){
//   if(this.state.ItemStatus.Stock != "" &&
//       this.state.OwnID != "" && this.state.VenderStatus.Balance != "" 
//       && this.state.Amount != 0){
//       // PURCHASE RECORD
//     firebase.database().ref('/Purchase').push({
//       Item : this.state.ItemStatus.Item,
//       ItemID : this.state.ItemStatus.MyId,
//       Vender : this.state.VenderStatus.Name,
//       VenderID : this.state.VenderStatus.MyId,
//       Quantity : this.state.Quantity,
//       // Weigth : this.state.Weigth,
//       Rate : this.state.Rate,
//       Amount : this.state.Amount,
//       IdentifyID : this.state.OwnID,
//       AvailableStock : this.state.Weigth,
//       Expences : 0,
//       AddBy:"Admin",
//       AddOn:this.state.Date.getDate()+"/"+(this.state.Date.getMonth()+1)+"/"+this.state.Date.getFullYear()
//      }).then((val)=>{
//       // PAYABLE
//      firebase.database().ref('/Payable/'+this.state.VenderStatus.MyId).push({
//        ID:val.key,
//        Amount:this.state.Amount
//        })
//       // ITEM HISTORY

      
//       firebase.database().ref('/ItemHistory/'+this.state.ItemStatus.MyId+'/Purchase').push({
//         ID:val.key,
//         Quantity:this.state.Quantity
//         })
//      // STOCK UPDATE
//      firebase.database().ref('/MyItems/'+this.state.ItemStatus.MyId+'/Stock').set(
//       Number(this.state.ItemStatus.Stock)+Number(this.state.Quantity)    
//      )
//        // PAYABLE UPDATE
//      firebase.database().ref('/MyVender/'+this.state.VenderStatus.MyId+'/Balance').set(
//          Number(this.state.VenderStatus.Balance)+Number(this.state.Amount)    
//         )
//         this.setState({Quantity:"",Rate:"",Amount:"",OwnID:""})
//         // this.props.LoadMyItem();
//         this.props.history.push('/MyItems')
//         // this.props.LoadMyVender();
      
//       })
//         }
//     else{
//       alert("Please Fill All Required Fields")
//     } 
// }

ManageTable(){
if(this.state.RequiredTable!==0){
  this.TableData=[];
  for(var i=1; i<=this.state.RequiredTable; i++){
      this.TableData.push({
          MyIndex:i,
          Item:{},
          Quantity:0,
          SalePrice:0,
          Amount:0
      })
  }
    this.setState({RowHidden:true})
}
}


render(){
  this.MyItems=this.props.MyItems;
  this.MyVenders=this.props.MyVenders;
  return(

<div>


    <h1 style={{textAlign:"center"}} >PURCHASE BOOK</h1>




{/* <input type="Number"  /> */}
{/* <Button  >ADD</Button> */}
<TextField id="outlined-basic" className={this.state.RowHidden ? "NonActive" : "AddPurchaseRow"} 
onChange={(e)=>this.setState({RequiredTable:e.target.value})}
   label="Req. Rows" variant="outlined" />   
<Button variant="contained" color="primary" className={this.state.RowHidden ? "NonActive" : "AddPurchaseRow"}
onClick={()=>this.ManageTable()}>ADD ROWS</Button>
<br />



{/* <button onClick={()=>alert(this.state.chk)} ></button> */}

<TextField id="outlined-basic" onChange={(e)=>this.state.OwnID=e.target.value}
   label="Identify ID" variant="outlined" />   

<Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyVenders}
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  // value={this.state.VenderStatus}
  onChange={(e,value)=>{
    if(value!=null)this.setState({VenderStatus:value})
    else{ this.setState({VenderStatus:{Balance:""}}) }
  }} 
  renderInput={params => <TextField {...params} label="Vender" variant="outlined" />}
/>
<br /><br />


<div className="PurchaseItemDiv" >
{this.TableData.map((val, index)=>{
  return(
    <div>
{/* <span className="PurchaseIndex" >{val.MyIndex}</span> */}
<Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyItems}
  getOptionLabel={option => option.Item}
  style={{ width: 300 }}
  onChange={(e,value)=>{
    if(value!=null){
      // this.TableData[index].Item=value
      this.TableData[index].Item=value;
      this.TableData[index].SalePrice=value.SalePrice;
      this.setState({Date:this.state.Date})
    }
    else{ this.setState({ItemStatus:{Stock:""}}) }
  }} 
  renderInput={params => <TextField {...params}  label={"Item "+ (index+1)} variant="outlined" />}
/>
<TextField id="outlined-basic" onChange={(e)=>this.UpdateData(e,index,"Quantity")} onBlur={(e)=>this.CalAmountQ(e,index)}
  value={this.TableData[index].Quantity} label="Quantity" variant="outlined" />
<TextField id="outlined-basic" onChange={(e)=>this.UpdateData(e,index,"Rate")} onBlur={(e)=>this.CalAmountR(e,index)}
  value={this.TableData[index].SalePrice} label="Rate" variant="outlined" />   
<TextField id="outlined-basic" 
   label="Amount" value={this.TableData[index].Amount} disabled variant="outlined" />
    </div>
  )
})}
</div>
  <h2>Total Amount : {this.state.TotalAmount}</h2>





<br />
<br />

<Button variant="contained" color="primary"
  onClick={()=>this.AddMe()} >
      PURCHASE
</Button>
    <br />
<Button variant="contained" color="secondary"
  onClick={()=>this.props.history.push('/')} >
      Close
</Button>

<br /><br />
  <span>Vender Balance : {this.state.VenderStatus.Balance}</span><br />
  {/* <span>Item Stock : {this.state.ItemStatus.Stock}</span> */}
</div>
)
}

}

function mapStateToProps(state){
  return({
    MyItems:state.MyReducer.MyItems,
    MyVenders:state.MyReducer.MyVenders
  })
  }
  
function mapDispatchToProps(dispatch){
  return({
      LoadMyItem:()=>{
          dispatch(LoadItem())
      },
      LoadMyVender:()=>{
        dispatch(LoadVender())
    } 
  })
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Purchase);
  
  