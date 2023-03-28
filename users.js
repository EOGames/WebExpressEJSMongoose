const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema(
    {
        name : String,
        email: String
    }
)

const users = mongoose.model('users',studentSchema);

module.exports = users;