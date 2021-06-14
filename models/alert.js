const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alertSchema = new Schema({

    mobile: {
        type: Boolean,
        required: true,
        trim: true
    },
    email: {
        type: Boolean,
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

module.exports = mongoose.model("Alert", alertSchema, 'alerts');
