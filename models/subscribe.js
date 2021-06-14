const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscribeSchema = new Schema({

    plan: {
        type: String,
        required: true,
        trim:true
    },
    expiration: {
        type: Date,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Subscribe", subscribeSchema, 'subscribe');
