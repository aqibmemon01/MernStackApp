import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


class About extends Component {
    render() {
        return (
            <div>
                <h1>Hello About {this.props.UserName}</h1>
                 {/* <button onClick={()=>this.props.history.push("./Home/Student")} >GO TO STUDENT</button>
                 <button onClick={()=>this.props.history.push("./Home/Company")} >GO TO COMPANY</button>
                 <button onClick={()=>this.props.history.push("./Home/Admin")} >GO TO ADMIN</button> */}
                 
                 <button onClick={()=>this.props.history.push("./Home/Students")} >GO TO STUDENT</button>
                 <button onClick={()=>this.props.history.push("./Home/Company")} >GO TO COMPANY</button>
                 <button onClick={()=>this.props.history.push("./Login")} >LOGIN</button>
                <Link to='/'>Go to Home</Link>
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
    
    })
    }
    
    

export default connect(mapStateToProps,mapDispatchToProps)(About);
    
    
