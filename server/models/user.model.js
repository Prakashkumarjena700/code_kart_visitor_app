const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, required: true, enum: ['security', 'owner'] }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

module.exports = {
    userModel
}