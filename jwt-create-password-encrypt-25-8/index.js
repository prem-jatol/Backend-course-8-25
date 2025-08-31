const express = require('express'); // for api managment + server create
const mongoose = require('mongoose'); // for connect mongodb database
const cors = require('cors');
const AdminRouter = require('./router/AdminRouter');
require('dotenv').config();

const PORT = 5000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(cors());

app.use(express.json());

app.use('/admin', AdminRouter);

mongoose.connect(MONGODB_URL)
    .then(
        () => console.log("mongoDB database connected")
    )
    .catch(
        () => console.log("error to connect db")
    )

app.listen(PORT, () => {
    console.log("server started on port", PORT);
})