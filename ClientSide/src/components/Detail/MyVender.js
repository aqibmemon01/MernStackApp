import React, { Component } from 'react';
import {connect} from 'react-redux';
import {LoadVender} from '../../ReduxStore/Action/action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button,TextField,CircularProgress} from '@material-ui/core';
import '../../CSS/MyCSS.css'


class MyVender extends Component {

componentDidMount(){
    this.props.LoadMyVender()
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
if(newprops.MyVenders!=this.props.MyVenders){
    this.MyItem=newprops.MyVenders;
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
  getOptionLabel={option => option.Name}
  style={{ width: 300 }}
  onChange={(e,value)=>this.SearchMe(value)} 
  renderInput={params => <TextField {...params} label="Search Item" variant="outlined" />}
/>
               <table className="customers" >
                 <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone #</th>
                            <th>Balance</th>
                            <th>Add By</th>
                            <th>Add On</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                     <tbody className={this.state.Mode==="Normal" ? "ABC" : "NonActive"} >
                        {this.MyItem.map((val,index) => {
                            return (
                                <tr key={index} >
                                    <td>{val.Name}</td>
                                    <td>{val.Phone}</td>
                                    <td>{val.Balance}</td>
                                    <td>{val.AddBy}</td>
                                    <td>{val.AddOn}</td>
                                    <td><button>Edit</button></td>
                                </tr>
                            )
                        })}
             </tbody>        
              <tfoot> 
                       {this.state.SearchedItem.map((val,index) => {
                            return (
                                <tr key={index} >
                                    <td>{val.Name}</td>
                                    <td>{val.Phone}</td>
                                    <td>{val.Balance}</td>
                                    <td>{val.AddBy}</td>
                                    <td>{val.AddOn}</td>
                                    <td><button>Edit</button></td>
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
    MyVenders:state.MyReducer.MyVenders
})
}

function mapDispatchToProps(dispatch){
    return({
        LoadMyVender:()=>{
            dispatch(LoadVender())
        }
    })  
}


export default connect(mapStateToProps,mapDispatchToProps)(MyVender);

