const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    carrier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shipper: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastMsg: {
        type: String,
        trim: true
    },
    unreadMsgCount: {
        type: Number,
        trim: true
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Quote',
        required: true
    }

},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Chat", chatSchema, 'chats');
