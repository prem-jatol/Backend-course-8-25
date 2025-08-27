
const { encrypPassword, comparePassword, generateToken } = require("../helper");
const AdminModel = require("../model/AdminModel");
const bcrypt = require("bcryptjs");
// import bcrypt from "bcryptjs";

class AdminCtr {
    adminList = () => {
        return new Promise(
            async (res, rej) => {
                try {
                    const result = await AdminModel.find();
                    if (result) {
                        res({ msg: "admin list", data: result })
                    } else {
                        res({ msg: "no any list" })
                    }
                } catch (err) {
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

    createAdmin = (data) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const { name, email, password, role } = data;
                    // console.log("data:", data);

                    const hash = encrypPassword(password);

                    const result = new AdminModel({
                        name: name, email: email, password: hash, role: role
                    });

                    result.save()
                        .then(
                            (success) => {
                                res({ msg: "Admin created", status: 1 })
                            }
                        )
                        .catch((err) => {
                            console.log(err);
                            rej({ msg: "Error to create admin", status: 1 })

                        })
                } catch (err) {
                    console.log("internal server error:", err.message);

                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

    loginAdmin = (data) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const { email, password } = data;
                    const user = await AdminModel.findOne({ email: email });
                    if (user) {
                        const isPasswordValid = comparePassword(password, user.password)
                        if (isPasswordValid) {
                            const data = { name: user.name, email: user.email, role: user.role };
                            const token = await generateToken(data);

                            res({ msg: "Login successfully", status: 1, token: token })
                        } else {
                            rej({ msg: "Password not match", status: 0 })
                        }
                    } else {
                        rej({ msg: "Invailid email", status: 0 })
                    }
                } catch (err) {
                    console.log(err.message);

                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

    profileEdit = (id, data) => {
        return new Promise(
            async (res, rej) => {
                try {
                    const { name, email, password, role } = data;
                    const result = await AdminModel.findByIdAndUpdate(id, {
                        name: name,
                        email: email,
                        password: password,
                        role: role
                    }, { new: true })

                    if (!result) {
                        res({ msg: "Admin not found", status: 0 });
                    } else {
                        res({ msg: "Admin updated successfully", status: 1, data: result });
                    }

                } catch (err) {
                    console.log("internal server error:", err.message);
                    rej({ msg: "Internal server error", status: 0 })
                }
            }
        )
    }

}

module.exports = AdminCtr;