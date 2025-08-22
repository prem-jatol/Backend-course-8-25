const AdminModel = require("../models/AdminModel");
const fs = require("fs");

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

    updateImage = (data, image) => {
        return new Promise(async (res, rej) => {
            try {
                let imgName = data.oldImage; // default keep old image

                // If new image uploaded, replace
                if (image) {
                    imgName =
                        new Date().getTime() +
                        Math.floor(Math.random() * 1000) +
                        image.name;
                    const destination = `./public/image/${imgName}`;

                    // move new image
                    await image.mv(destination);

                    // delete old image if exists
                    if (data.oldImage) {
                        fs.unlinkSync(`./public/image/${data.oldImage}`);
                    }
                }

                // update record in DB
                const updated = await AdminModel.findByIdAndUpdate(
                    data._id,
                    {
                        name: data.name,
                        email: data.email,
                        image: imgName,
                    },
                    { new: true }
                );

                if (updated) {
                    res({ msg: "Admin updated successfully", status: 1, updated });
                } else {
                    rej({ msg: "Admin not found", status: 0 });
                }
            } catch (err) {
                console.error(err);
                rej({ msg: "Internal server error", status: 0 });
            }
        });
    };
}

module.exports = AdminController;