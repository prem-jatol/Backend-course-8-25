const express = require('express'); // for api managment + server create
const mongoose = require('mongoose'); // for connect mongodb database
const AdminRouter = require('./routes/AdminRouter');

const PORT = 5000;

const app = express();
app.use(express.json())

// mongoose.connect('mongodb://localhost:27017/', {
//     dbName: "shool",
// })

// app.get('/admin', (req, res)=>{})

app.use('/admin', AdminRouter);

mongoose.connect('mongodb://localhost:27017/shool')
.then(
    ()=> console.log("mongoDB database connected")
)
.catch(
    ()=> console.log("error to connect db")
)

app.listen(PORT, ()=>{
    console.log("server started on port", PORT);  
})