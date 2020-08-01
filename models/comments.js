const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema ({
    comment: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)