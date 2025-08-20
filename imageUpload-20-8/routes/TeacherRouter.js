const express = require('express');
const TeacherModel = require('../models/TeacherModel');

const TeacherRouter = express.Router();

TeacherRouter.get('/', async (req, res)=>{
    const teachers = await TeacherModel.find();
    res.send({msg: "teachers data found", data: teachers})
})

module.exports = TeacherRouter;