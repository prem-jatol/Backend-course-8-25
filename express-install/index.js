const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routes/UserRoutes');

const app = express();

// mongoose.connect('mongodb://localhost:27017/shool')
// .then(
//     ()=> console.log("mongoDb Connected")
// ).catch(
//     (err)=> console.log("mongoDb not connected", err.message)
// )

app.get("/items", (req, res)=>{
    console.log(req);
    res.send("Hello world")
})

app.use('/admin', UserRouter);

// user/create
// admin/delete
// category/update
// product
// payment
// cart

app.listen(3000, (err)=>{
    if(err){ 
        console.log("server not started", err.message);
    }else{
        console.log("server started on port 3000");
        
    }
});