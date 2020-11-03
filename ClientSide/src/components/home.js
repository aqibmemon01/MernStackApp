import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {ChangeState} from '../ReduxStore/Action/action';


class Home extends Component {
constructor(){
    super();
  this.state={
      UserName:''
  }

this.checkchange=this.checkchange.bind(this)
this.UpdateValue=this.UpdateValue.bind(this)


}
checkchange(){
//   console.log("WORKINGGGGG")
  this.props.ChangeStateToReducer(this.state.UserName);
}
UpdateValue(val){
this.setState({UserName:val.target.value})
// console.log(this.state.UserName)


}


render() {
        return (
            <div>
                {this.props.match.params.Type}
                {/* <h1>WELCOME TO </h1> */}
                <h1>Hello World {this.props.UserName}</h1>
                <button onClick={this.checkchange} >Change</button>
                <input value={this.state.UserName} onChange={(val)=>this.UpdateValue(val)} />
                <Link to='/about'>Go to About</Link>
            </div>
        )
    }
}

function mapStateToProps(state){
return({
    UserName:state.MyReducer.UserName
})
}

function mapDispatchToProps(dispatch){
return({
    ChangeStateToReducer:(PickUserName)=>{
        dispatch(ChangeState(PickUserName))
    }

})
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);

