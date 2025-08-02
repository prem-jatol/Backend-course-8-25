const express = require("express");

const StudentRouter = express.Router();

StudentRouter.get("/", (req, res)=>{
    // console.log(req);
    res.send("this is student get api")
})

StudentRouter.put("/update", (req, res)=>{
    // console.log(req);
    res.send("this is student get api for update")
})


StudentRouter.get("/update", (req, res)=>{
    // console.log(req);
    res.send("this is student get api for update")
})


module.exports = StudentRouter;