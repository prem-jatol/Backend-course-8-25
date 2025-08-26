const express = require('express');
const AdminCtr = require('../controller/AdminCtr');


const AdminRouter = express.Router();

AdminRouter.get('/', async (req, res) => {
    const result = new AdminCtr().adminList();
    result.then(
        (success) => {
            res.send(success)
        }
    )
        .catch((err) => {
            res.send(err)
        })
})


AdminRouter.post('/create', async (req, res) => {
    const result = new AdminCtr().createAdmin(req.body);
    result.then(
        (success) => {
            res.send(success)
        }
    )
        .catch((err) => {
            res.send(err)
        })
})

AdminRouter.post('/login', async (req, res) => {
    const result = new AdminCtr().loginAdmin(req.body);
    result.then(
        (success) => {
            res.send(success)
        }
    )
        .catch((err) => {
            res.send(err)
        })
})

module.exports = AdminRouter;