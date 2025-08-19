const express = require('express');
const AdminModel = require('../models/AdminModel');
const AdminController = require('../controllers/AdminController');

// const date = new Date.now()

const AdminRouter = express.Router();

AdminRouter.get('/', (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const sortBy = req.query.sortBy || 'name';
    const order = req.query.order === 'desc' ? -1 : 1;

    const category = req.query.category;
    const min = req.query.min;
    const max = req.query.max;

    const result = new AdminController().adminList(page, limit, sortBy, order, category, min, max);
    result
        .then((success) => {
            res.send(success)
        })
        .catch(
            (err) => res.send(err)
        )
})

AdminRouter.get("/paginate", async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const result = new AdminController().adminPagination(page, limit);
    result
        .then((success) => {
            res.send(success)
        })
        .catch(
            (err) => res.send(err)
        )
})

AdminRouter.get("/sorting",
    (req, res) => {
        const sortBy = req.query.sortBy || 'name';
        const order = req.query.order === 'desc' ? -1 : 1;
        const result = new AdminController().adminSorting(sortBy, order);
        result
            .then(
                (success) => {
                    res.send(success)
                }
            )
            .catch(
                (err) => {
                    res.send(err)
                }
            )
    }
)

AdminRouter.get("/filter",
    (req, res) => {
        const category = req.query.category;
        const minValue = req.query.minValue;
        const maxValue = req.query.maxValue;
        const result = new AdminController().adminFilter(category, minValue, maxValue);
        result
            .then(
                (success) => {
                    res.send(success)
                }
            )
            .catch(
                (err) => {
                    res.send(err)
                }
            )
    }
)

AdminRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    let admin = await AdminModel.findById(id).populate('teacher');
    // const newObj = { ...admin };
    // if (!admin.teacher || admin.teacher === null) {
    //     console.log(newObj);
    //     newObj.teacher = "Teacher not exist";
    // }
    res.send({ msg: "admin found", admin })
})

AdminRouter.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const exsitingAdmin = await AdminModel.findById(id);
        const data = req.body;
        const updatedData = await AdminModel.findOneAndUpdate({ _id: id }, {
            name: data.name || exsitingAdmin.name,
            email: data.email || exsitingAdmin.email,
            password: data.password || exsitingAdmin.password
        }, { new: true })

        res.send({ smg: "data updated", updatedData })
    } catch (err) {
        console.log("internal server error", err.message);

    }
})

AdminRouter.post("/create", async (req, res) => {
    const data = req.body;
    const { name, email, password, teacher } = data;
    const existUser = await AdminModel.find({ email: email });

    if (existUser.length !== 0) {
        res.send({ msg: "email already exist", status: 0 })
    } else {
        const admin = new AdminModel({
            name: name,
            email: email,
            password: password,
            teacher: teacher
        })
        const savedAdmin = await admin.save()
        res.send({ msg: "admin created", savedAdmin })
    }

})

AdminRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const deleteUser = await AdminModel.deleteOne({ _id: id });
    res.send({ msg: "user deleted", deleteUser })
})

module.exports = AdminRouter;