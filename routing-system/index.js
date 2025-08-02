const express = require('express');
const AdminRouter = require('./routes/AdminRouter');
const StudentRouter = require('./routes/StudentRouter');

const app = express();

// app.get("/admin/update", (req, res)=>{
//     res.send("hello world")
// })

app.use("/admin", AdminRouter);
app.use("/student", StudentRouter);

app.listen(5000, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("server started on port no. 5000");   
    }
})