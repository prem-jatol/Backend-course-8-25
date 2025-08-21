const AdminModel = require("../models/AdminModel");

class AdminController {
    imageUpload = (data, image) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const imgName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
                    const destination = `./public/image/${imgName}`;
                    if (!image) {
                        rej({ msg: "Please uplaod image", status: 0 })
                    }
                    image.mv(
                        destination,
                        async (err) => {
                            if (!err) {
                                const result = await new AdminModel({
                                    name: data.name,
                                    email: data.email,
                                    image: imgName
                                });
                                result.save();
                                res({ msg: "image uploaded successfully", status: 1 })
                            } else {
                                rej({ msg: "Unable to upload image", status: 0 })

                            }
                        }
                    )
                } catch (err) {
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }
}

module.exports = AdminController;