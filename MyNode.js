const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {mongourl} = require('./Config/Keys');
const bodyParser = require('body-parser');
const AddCustomer = require('./Modals/AddCustomer')
const AddVender = require('./Modals/AddVender')
const AddItem = require('./Modals/AddItem')
const AddAccount = require('./Modals/AddAccount')


const MyCustomers = mongoose.model('Customers')    
const MyVenders = mongoose.model('Venders')    
const MyItems = mongoose.model('Items')    
const MyAccounts = mongoose.model('Accounts')    

mongoose.connect(mongourl);

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())




app.get('/CheckUpdate',(req,res)=>{
    MyVenders.update({"Name":"Aqib Memon Check"},{"Name":"RETURNED"}).then(res.send("UPDATE"))
    .catch((err)=>res.send(err))
    // res.send("Update")
})

app.post('/AddCustomer',(req, res)=>{
    const Data = new AddCustomer({
        Name:req.body.Name,
        Address:req.body.Address,
        Phone:req.body.Phone,
        Opening:req.body.Opening,
        AddBy:req.body.AddBy,
        AddOn:req.body.AddOn
    });
    Data.save().then(data=>{
        console.log("CUSTOMER ADDED")
        res.send(data)
    })
})
app.post('/AddVender',(req, res)=>{
    const Data = new AddVender({
        Name:req.body.Name,
        Address:req.body.Address,
        Phone:req.body.Phone,
        Opening:req.body.Opening,
        AddBy:req.body.AddBy,
        AddOn:req.body.AddOn
    });
    Data.save().then(data=>{
        console.log("VENDER ADDED")
        res.send(data)
    })
})
app.post('/AddItem',(req, res)=>{
    const Data = new AddItem({
        Item:req.body.Item,
        Brand:req.body.Brand,
        Stock:req.body.Opening,
        SalePrice:req.body.SalePrice,
        AddBy:req.body.AddBy,
        AddOn:req.body.AddOn,
    });
    Data.save().then(data=>{
        console.log("ITEM ADDED")
        res.send(data)
    })
})
app.post('/AddAccount',(req, res)=>{
    const Data = new AddAccount({
        Name:req.body.Name,
        Opening:req.body.Opening,
        AddBy:req.body.AddBy,
        AddOn:req.body.AddOn,
    });
    Data.save().then(data=>{
        console.log("ACCOUNT ADDED")
        res.send(data)
    })
})
app.get('/LoadCustomers',(req, res)=>{
    MyCustomers.find({})
    .then((data)=>{
     res.send(data)
    })
})
app.get('/LoadVenders',(req, res)=>{
    MyVenders.find({})
    .then((data)=>{
     res.send(data)
    })
})
app.get('/LoadItems',(req, res)=>{
    MyItems.find({})
    .then((data)=>{
     res.send(data)
     })
})
app.get('/LoadAccounts',(req, res)=>{
    MyAccounts.find({})
    .then((data)=>{
     res.send(data)
     })
})



// app.get('/FindMe/:id', (req, res) => {
//     MyCustomers.find({"Name":req.params.id}).then(
//         (data)=>{
//             console.log(data)
//             res.send(data)
//         }
//     )
// })

// app.get('/UpdateMe/:FindVal/:UpdateVal', (req, res) => {
//     MyCustomers.updateOne({"Name":req.params.FindVal},{"Name":req.params.UpdateVal})
//     .then(
//         (data)=>{
//             console.log(data)
//             res.send(data)
//         }
//     )
// })

// app.get('/home', (req, res) => {
//     MyCustomers.find({}).then(
//         (data)=>{
//             console.log(data)
//             res.send(data)
//         }
//     )
// })

// app.get('/hey', (req, res) => res.send('ho!'))



app.listen(8080)