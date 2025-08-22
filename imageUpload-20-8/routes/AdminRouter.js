const express = require('express');
const AdminModel = require('../models/AdminModel');
const AdminController = require('../controllers/AdminController');
const fileUpload = require('express-fileupload');

// const date = new Date.now()

const AdminRouter = express.Router();

AdminRouter.post('/upload',
    fileUpload({
        createParentPath: true
    }), // middleware
    (req, res) => {
        const body = req.body;
        const image = req.files.image;

        const result = new AdminController().imageUpload(body, image)
        result
            .then((success) => {
                res.send(success)
            })
            .catch((err) => {
                res.send(err)
            })
    })

AdminRouter.get('/', async (req, res) => {

    const admins = await AdminModel.find();
    res.send({msg: "all admins", data: admins})
})


AdminRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    let admin = await AdminModel.findById(id);
    res.send({ msg: "admin found", user: admin })
})

AdminRouter.put('/update',
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const body = req.body;
        const image = req.files.image;

        const result = new AdminController().updateImage(body, image)
        result
            .then((success) => {
                res.send(success)
            })
            .catch((err) => {
                res.send(err)
            })
    }
)

module.exports = AdminRouter;