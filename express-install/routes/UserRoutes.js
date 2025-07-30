const express = require('express');

const UserRouter = express.Router();

UserRouter.get(
    "/",
    (req, res)=>{
        const result = true;
        if(result){
            res.send("/user api working")
        }else{
            res.send("error")
        }
    }
)

module.exports = UserRouter;