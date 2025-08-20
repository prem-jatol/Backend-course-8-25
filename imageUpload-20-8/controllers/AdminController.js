const AdminModel = require("../models/AdminModel");

class AdminController {
    imageUpload = () => {
        return new Promise(
            async (res, rej) => {
                try {
                    res({msg: "image upload api calling"})
                } catch (err) {
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }
}

module.exports = AdminController;