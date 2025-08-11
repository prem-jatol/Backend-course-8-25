const AdminModel = require("../models/AdminModel");

class AdminController {
    adminPagination = (page, limit) => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const pageNum = parseInt(page) || 1;
                    const limitNum = parseInt(limit) || 10;

                    const skip = (pageNum - 1) * limitNum;

                    const admins = await AdminModel.find().skip(skip).limit(limitNum);
                    if (admins) {
                        resolve({ msg: "admins fetched", data: admins, page: pageNum, limit: limitNum, total: await AdminModel.countDocuments() })
                    }
                } catch (err) {
                    console.log(err.message);
                    reject({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }
}

module.exports = AdminController;