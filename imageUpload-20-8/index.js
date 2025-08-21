const express = require('express'); // for api managment + server create
const mongoose = require('mongoose'); // for connect mongodb database
const cors = require('cors');
const AdminRouter = require('./routes/AdminRouter');
const TeacherRouter = require('./routes/TeacherRouter');

const PORT = 5000;

const app = express();
app.use(cors());

// app.use(cors(['http://localhost:5173/', 'http://localhost:2012/']));
// app.use(cors(['https://www.codespazio.com', '']));

app.use(express.json());
app.use(express.static('public'));

// mongoose.connect('mongodb://localhost:27017/', {
//     dbName: "shool",
// })

// app.get('/admin', (req, res)=>{})

app.use('/admin', AdminRouter);
app.use('/teacher', TeacherRouter)

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