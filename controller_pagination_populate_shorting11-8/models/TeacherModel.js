const mongoose = require('mongoose');

const teacherModel = new mongoose.Schema({
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
    father_name: {
        type: String,
        require: true,
        maxlength: 20
    }
}, {
    timestamps: true
})

const TeacherModel = mongoose.model('Teacher', teacherModel)

module.exports = TeacherModel;