const AdminModel = require("../models/AdminModel");

class AdminController {
    adminList = (page, limit, sortBy, order, category, min, max) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const skip = (page - 1) * limit;

                    let filter = {};
                    if (category) {
                        filter.category = category;
                    }
                    if (min && max) {
                        filter.password = {
                            $gte: parseInt(min),
                            $lte: parseInt(max)
                        };
                    }

                    const admins = await AdminModel.find(filter)
                        .populate('teacher', 'name')
                        .sort({ [sortBy]: order })
                        .skip(skip)
                        .limit(limit);

                    const total = await AdminModel.countDocuments(filter);

                    res({
                        page,
                        totalPages: Math.ceil(total / limit),
                        totalAdmins: total,
                        total: limit,
                        data: admins
                    });
                } catch (err) {
                    console.log(err.message);
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

    adminPagination = (page, limit) => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const pageNum = parseInt(page) || 1;
                    const limitNum = parseInt(limit) || 10;

                    const skip = (pageNum - 1) * limitNum;

                    const admins = await AdminModel.find().skip(skip).limit(limitNum);
                    if (admins) {
                        resolve({
                            msg: "admins fetched",
                            data: admins,
                            page: pageNum,
                            limit: limitNum,
                            total: await AdminModel.countDocuments()
                        })
                    }
                } catch (err) {
                    console.log(err.message);
                    reject({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

    adminSorting = (sortBy, order) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const result = await AdminModel.find().sort({ [sortBy]: order })
                    res({
                        msg: `Admins sorted by ${sortBy} in ${order === 1 ? "ascending" : "descending"} order.`,
                        data: result
                    })
                } catch (err) {
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

    adminFilter = (category, min, max) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const filter = {};
                    filter.category = category;

                    if (min && max) {
                        filter.password = {
                            $gte: min,
                            $lte: max
                        }
                    }
                    console.log(filter);

                    // const result = await AdminModel.find({password: {$lte : max, $gte : min}});
                    const result = await AdminModel.find(filter);
                    res({ msg: `Filterd by ${category}`, data: result })
                } catch (err) {
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }
}

module.exports = AdminController;