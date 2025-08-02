const express = require('express');
const AdminModel = require('../models/AdminModel');

const AdminRouter = express.Router();

AdminRouter.get("/", (req, res) => {
    res.send("admin get api")
})

AdminRouter.post("/create", async (req, res) => {
    const data = req.body;
    const { name, email, password } = data;
    const admin = new AdminModel({
        name: name,
        email: email,
        password: password
    })
    const savedAdmin = await admin.save()

    res.send({msg: "admin created", savedAdmin})
})

module.exports = AdminRouter;