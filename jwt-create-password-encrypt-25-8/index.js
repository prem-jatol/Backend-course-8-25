const express = require('express'); // for api managment + server create
const mongoose = require('mongoose'); // for connect mongodb database
const cors = require('cors');
const AdminRouter = require('./router/AdminRouter');

const PORT = 5000;

const app = express();
app.use(cors());

app.use(express.json());

app.use('/admin', AdminRouter);

mongoose.connect('mongodb://localhost:27017/ecomm')
.then(
    ()=> console.log("mongoDB database connected")
)
.catch(
    ()=> console.log("error to connect db")
)

app.listen(PORT, ()=>{
    console.log("server started on port", PORT);  
})