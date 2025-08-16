const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        require: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    password: {
        type: Number,
        require: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
}, {
    timestamps: true
})

const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel;