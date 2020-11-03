import firebase from '../../Config/fire';


export function ChangeState(PickUserName){
    return dispatch => {
        dispatch({type:'CHANGEUSERNAME',payload:PickUserName})
    }

}

export function LoadCustomer(){
    return dispatch => {
fetch('/LoadCustomers')
.then((res)=>res.json())
.then((res2)=>{
    dispatch({type:'LOADCUSTOMER',payload:res2})
})
     } }
export function LoadVender(){
    return dispatch => {
        fetch('/LoadVenders')
        .then((res)=>res.json())
        .then((res2)=>{
            dispatch({type:'LOADVENDER',payload:res2})
        })
        } }
export function LoadItem(){
    return dispatch => {
        fetch('/LoadItems')
        .then((res)=>res.json())
        .then((res2)=>{
            dispatch({type:'LOADITEM',payload:res2})
        })
        } }
export function LoadAccount(){
    return dispatch => {
        fetch('/LoadAccounts')
        .then((res)=>res.json())
        .then((res2)=>{
            dispatch({type:'LOADACCOUNT',payload:res2})
        })
        } }












    
export function LoadPurchase(){
    return dispatch => {
        firebase.database().ref("Purchase").once('value', (snapshot)=> {
             var getData=snapshot.val();
            }).then((getData)=>{
             var MyData = getData.val();
             var get2=[];
             for(var x in MyData){
                MyData[x].MyId=x;
                get2.push(
                     MyData[x]
                 )
             }
        dispatch({type:'LOADPURCHASE',payload:get2})
    } ) } }
    
