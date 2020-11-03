import React, { Component } from 'react';
import {connect} from 'react-redux';
import {LoadPurchase} from '../../ReduxStore/Action/action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button,TextField,CircularProgress} from '@material-ui/core';
import '../../CSS/MyCSS.css'


class MyPurchase extends Component {

componentDidMount(){
    this.props.LoadMyPurchase()
}

constructor(props){
    super(props);
  this.state={
    SearchedItem:[],
    Mode:"Normal",
    DataRec:"NO"
  }

this.SearchMe=this.SearchMe.bind(this)
// this.SearchByDate=this.SearchByDate.bind(this)
}
MyItem = [ ]
SearchedItem=[]

SearchMe(value,Type){
    if(value!==null){
        this.SearchedItem=[];
     if(Type==="ByDate"){
        this.MyItem.map((val)=>{ 
        if(val.AddOn===value.AddOn){
            this.SearchedItem.push(val)
        }})
        }
     else if(Type==="ByItem"){
        this.MyItem.map((val)=>{ 
        if(val.Item===value.Item){
            this.SearchedItem.push(val)
        }})
        }
     else if(Type==="ByID"){
        this.MyItem.map((val)=>{ 
        if(val.IdentifyID===value.IdentifyID){
            this.SearchedItem.push(val)
        }})
        }

        this.setState({Mode:"Search"})    
    }
else{
    this.SearchedItem=[];
    this.setState({Mode:"Normal"})
}
}



componentWillReceiveProps(newprops){
if(newprops.Purchases!=this.props.Purchases){
    this.MyItem=newprops.Purchases;
    this.setState({DataRec:"YES"})
}
}

render(){

        return (    
            <div>
<CircularProgress color="primary" className={this.state.DataRec==="NO" ? "MyLoader" : "NonActive"} />
<Autocomplete
  className="myauto Margintop"
  id="combo-box-demo"
  options={this.MyItem}
  getOptionLabel={option => option.IdentifyID}
  style={{ width: 300 }}
  onChange={(e,value)=>this.SearchMe(value,"ByID")} 
  renderInput={params => <TextField {...params} label="Search By ID" variant="outlined" />}
/>
<Autocomplete
  className="myauto Margintop"
  id="combo-box-demo"
  options={this.MyItem}
  getOptionLabel={option => option.Item}
  style={{ width: 300 }}
  onChange={(e,value)=>this.SearchMe(value,"ByItem")} 
  renderInput={params => <TextField {...params} label="Search By Item" variant="outlined" />}
/>
<Autocomplete
  className="myauto Margintop"
  id="combo-box-demo"
  options={this.MyItem}
  getOptionLabel={option => option.AddOn}
  style={{ width: 300 }}
  onChange={(e,value)=>this.SearchMe(value,"ByDate")} 
  renderInput={params => <TextField {...params} label="Date Filter" variant="outlined" />}
/>
               <table className="customers" >
                 <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item</th>
                            <th>Vender</th>
                            <th>Rate</th>
                            <th>Weigth</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Report</th>
                        </tr>
                        </thead>
                     <tbody className={this.state.Mode==="Normal" ? "ABC" : "NonActive"} >
                        {this.MyItem.map((val,index) => {
                            return (
                                <tr key={index} >
                                    <td>{val.IdentifyID}</td>
                                    <td>{val.Item}</td>
                                    <td>{val.Vender}</td>
                                    <td>{val.Rate}</td>
                                    <td>{val.Weigth}</td>
                                    <td>{val.Amount}</td>
                                    <td>{val.AddOn}</td>
                                    <td><button onClick={
                                        ()=>this.props.history.push('/SinglePurchase/'+val.MyId)
                                    } >Report</button></td>
                                </tr>
                            )
                        })}
             </tbody>        
              <tfoot> 
                       {this.SearchedItem.map((val,index) => {
                            return (
                                <tr key={index} >
                                    <td>{val.IdentifyID}</td>
                                    <td>{val.Item}</td>
                                    <td>{val.Vender}</td>
                                    <td>{val.Rate}</td>
                                    <td>{val.Weigth}</td>
                                    <td>{val.Amount}</td>
                                    <td>{val.AddOn}</td>
                                    <td><button onClick={
                                        ()=>this.props.history.push('/SinglePurchase/'+val.MyId)
                                    }>Report</button></td>
                                </tr>
                            )
                        })}
               </tfoot>

             </table>

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

export default connect(mapStateToProps,mapDispatchToProps)(MyPurchase);

