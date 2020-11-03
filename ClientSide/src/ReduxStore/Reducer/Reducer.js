import ActionType from '../Contant/Constant'


const INITIAL_STATE={
 UserName:'Aqib Memon Here',
 MyItems:[],
 MyAccounts:[],
 MyVenders:[],
 MyCustomers:[],
 Purchases:[]
}



export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case ActionType.CHANGEUSERNAME:
            return ({
                ...state,
                UserName:action.payload
            })
        case ActionType.LOADITEM:
            return ({
                ...state,
                MyItems:action.payload
            })
        case ActionType.LOADVENDER:
            return ({
                ...state,
                MyVenders:action.payload
            })
        case ActionType.LOADCUSTOMER:
            return ({
                ...state,
                MyCustomers:action.payload
            })
        case ActionType.LOADPURCHASE:
            return ({
                ...state,
                Purchases:action.payload
            })
        case ActionType.LOADACCOUNT:
            return ({
                ...state,
                MyAccounts:action.payload
            })
        case ActionType.ADDCUSTOMER:
            return ({
                ...state,
                MyCustomers:[...state.MyCustomers, action.payload]
            })
        case ActionType.ADDVENDER:
            return ({
                ...state,
                MyVenders:[...state.MyVenders, action.payload]
            })
        case ActionType.ADDITEM:
            return ({
                ...state,
                MyItems:[...state.MyItems, action.payload]
            })
        case ActionType.ADDACCOUNT:
            return ({
                ...state,
                MyAccounts:[...state.MyAccounts, action.payload]
            })
        default:
            return state;
    }
}