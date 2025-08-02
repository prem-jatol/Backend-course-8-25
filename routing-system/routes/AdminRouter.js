const express = require("express");

const AdminRouter = express.Router();

AdminRouter.get("/", (req, res)=>{
    console.log(req);
    res.send("this is admin api")
})

module.exports = AdminRouter;
