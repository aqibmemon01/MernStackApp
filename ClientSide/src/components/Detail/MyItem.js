import React, { Component } from 'react';
import {connect} from 'react-redux';
import {LoadItem} from '../../ReduxStore/Action/action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button,TextField,CircularProgress} from '@material-ui/core';
import '../../CSS/MyCSS.css'


class MyItem extends Component {

componentDidMount(){
    this.props.LoadMyItem()
}

constructor(props){
    super(props);
  this.state={
    SearchedItem:[],
    Mode:"Normal",
    DataRec:"NO"
  }


this.SearchMe=this.SearchMe.bind(this)
}
MyItem = [ ]
SearchedItem=[]
SearchMe(value){
    if(value!==null){
        this.state.SearchedItem[0]=value;
        this.setState({Mode:"Search"})    
    }
else{
    this.setState({SearchedItem:[],Mode:"Normal"})

}
}

componentWillReceiveProps(newprops){
if(newprops.MyItems!=this.props.MyItems){
    this.MyItem=newprops.MyItems;
    this.setState({DataRec:"YES"})
}
}

render(){

        return (
            <div>
<CircularProgress color="primary" className={this.state.DataRec==="NO" ? "MyLoader" : "NonActive"} />
<Autocomplete
  className="myauto"
  id="combo-box-demo"
  options={this.MyItem}
  getOptionLabel={option => option.Item}
  style={{ width: 300 }}
  onChange={(e,value)=>this.SearchMe(value)} 
  renderInput={params => <TextField {...params} label="Search Item" variant="outlined" />}
/>
               <table className="customers" >
                 <thead>
                        <tr>
                            <th>Item</th>
                            <th>Brand</th>
                            <th>Stock</th>
                            <th>Add By</th>
                            <th>Add On</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                     <tbody className={this.state.Mode==="Normal" ? "ABC" : "NonActive"} >
                        {this.MyItem.map((val,index) => {
                            return (
                                <tr key={index} >
                                    <td>{val.Item}</td>
                                    <td>{val.Brand}</td>
                                    <td>{val.Stock}</td>
                                    <td>{val.AddBy}</td>
                                    <td>{val.AddOn}</td>
                                    <td><button onClick={()=>this.props.history.push('EditItem/'+val._id)}>Edit</button></td>
                                </tr>
                            )
                        })}
             </tbody>        
              <tfoot> 
                       {this.state.SearchedItem.map((val,index) => {
                            return (
                                <tr key={index} >
                                    <td>{val.Item}</td>
                                    <td>{val.Brand}</td>
                                    <td>{val.Stock}</td>
                                    <td>{val.AddBy}</td>
                                    <td>{val.AddOn}</td>
                                    <td><button onClick={()=>this.props.history.push('EditItem/'+val._id)}>Edit</button></td>
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


export default connect(mapStateToProps,mapDispatchToProps)(MyItem);

