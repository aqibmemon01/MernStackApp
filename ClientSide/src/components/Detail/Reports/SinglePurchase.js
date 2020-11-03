import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {LoadPurchase} from '../../../ReduxStore/Action/action';
import {Button} from '@material-ui/core';
import '../../../CSS/MyCSS.css'
import '../../../CSS/PrintSetUp.css'


class MyItem extends Component {

componentDidMount(){
    this.props.Purchases.map((val)=>{
        if(val.MyId===this.props.match.params.ID){
               this.setState({MyPurchase:val})       
        }
    })
}

constructor(){
super();
this.state={
  MyPurchase:""
}

}

componentWillReceiveProps(NextProps){
  if(NextProps.Purchases!=this.props.Purchases){
    this.setState()
    }
}

render(){
    // alert(this.props.match.params.ID)
    // window.print()
return(
    <div>
        <div className="PurchaseDiv" >
        <h1>Purchase</h1>
        <h4>AL-Habib Twisting</h4>
        <h4>Plot#104,Near Navina Textile ,S.I.T.E., Karachi.</h4>
        <h4>Phone # 0332-5252456</h4>

<div className="Firstpart" >
<span>Vender : </span><br />
<span>{this.state.MyPurchase.Vender}</span><br />
<span>Plot # F205, Korangi, Karachi</span><br />
<span>Phone # 0316 2532723</span><br />
</div>

<div className="Secpart" >
<span>Date : </span> <span>{this.state.MyPurchase.AddOn}</span><br />
<span>PO # </span> <span>{this.state.MyPurchase.IdentifyID}</span><br />
<span>Purchase By : </span> <span>{this.state.MyPurchase.AddBy}</span><br />
</div>
<br />
<br />

<table >
    <tr>
        <th>QTY.</th>
        <th>DESCRIPTION</th>
        <th>WEIGTH</th>
        <th>RATE</th>
        <th>AMOUNT</th>
    </tr>
   <tbody>
            <tr>
                <td>{this.state.MyPurchase.Quantity}</td>
                <td>{this.state.MyPurchase.Item}</td>
                <td>{this.state.MyPurchase.Weigth}</td>
                <td>{this.state.MyPurchase.Rate}</td>
                <td>{this.state.MyPurchase.Amount}</td>
            </tr>
    </tbody>
     <tfoot>
      <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className="fd" >Sub Total</td>
          <td className="fd">{this.state.MyPurchase.Amount}</td>
      </tr>
      <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className="fd">Other Expence</td>
          <td className="fd">{this.state.MyPurchase.Expences}</td>
      </tr>      <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className="fd">Total</td>
          <td className="fd">{this.state.MyPurchase.Expences+this.state.MyPurchase.Amount}</td>
      </tr>
     </tfoot>
      </table>

<div className="SignLine" >
   Noman Ahmed
</div>

        </div>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<Button variant="contained" color="primary" onClick={()=>window.print()} >
    PRINT
</Button>
<br />
<Button variant="contained" color="secondary" onClick={()=>this.props.history.push('/MyPurchase')} >
    CLOSE
</Button>

    </div>
)    
}


}



function mapStateToProps(state){
return({
    Purchases:state.MyReducer.Purchases
})
}

function mapDispatchToProps(dispatch){
    return({
        LoadMyPurchase:()=>{
            dispatch(LoadPurchase())
        }
    })  
}


export default connect(mapStateToProps,mapDispatchToProps)(MyItem);

