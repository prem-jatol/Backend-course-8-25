const express = require('express');
const AdminModel = require('../models/AdminModel');
const AdminController = require('../controllers/AdminController');

// const date = new Date.now()

const AdminRouter = express.Router();

AdminRouter.post('/upload',
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const body = req.body;
        const file = req.files.file;
        const result = new AdminController().imageUpload()
        result
            .then((success) => {
                res.send(success)
            })
            .catch((err) => {
                res.send(err)
            })
    })

module.exports = AdminRouter;