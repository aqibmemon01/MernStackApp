

export function AddCustomer(Name, Address, Phone, Opening, AddBy, AddOn) {
    return dispatch => {
        // console.log(Name,Address,Phone,Opening,AddOn,AddBy)
        fetch("/AddCustomer", {
            method: "post",
            body: JSON.stringify({
                Name: Name,
                Address: Address,
                Phone: Phone,
                Opening: Opening,
                AddBy: AddBy,
                AddOn: AddOn,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((res2) => {
                dispatch({ type: 'ADDCUSTOMER', payload: res2 },)
            })
            .catch((err) => console.log(err))
    }
}
export function AddVender(Name, Address, Phone, Opening, AddBy, AddOn) {
    return dispatch => {
        // console.log(Name,Address,Phone,Opening,AddOn,AddBy)
        fetch("/AddVender", {
            method: "post",
            body: JSON.stringify({
                Name: Name,
                Address: Address,
                Phone: Phone,
                Opening: Opening,
                AddBy: AddBy,
                AddOn: AddOn,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((res2) => {
                dispatch({ type: 'ADDVENDER', payload: res2 },)
            })
            .catch((err) => console.log(err))
    }
}
export function AddItem(Item, Brand, Opening, SalePrice, AddBy, AddOn) {
    return dispatch => {
        // console.log(Name,Address,Phone,Opening,AddOn,AddBy)
        fetch("/AddItem", {
            method: "post",
            body: JSON.stringify({
                Item: Item,
                Brand: Brand,
                Opening: Opening,
                SalePrice: SalePrice,
                AddBy: AddBy,
                AddOn: AddOn,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((res2) => {
                dispatch({ type: 'ADDITEM', payload: res2 },)
            })
            .catch((err) => console.log(err))
    }
}
export function AddAccount(Name, Opening, AddBy, AddOn) {
    return dispatch => {
        // console.log(Name,Address,Phone,Opening,AddOn,AddBy)
        fetch("/AddAccount", {
            method: "post",
            body: JSON.stringify({
                Name: Name,
                Opening: Opening,
                AddBy: AddBy,
                AddOn: AddOn,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((res2) => {
                dispatch({ type: 'ADDACCOUNT', payload: res2 },)
            })
            .catch((err) => console.log(err))
    }
}


