const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bidSchema = new Schema({
    bid: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true 
    },
    proposal: {
        type: String,
        required: true,
        trim: true
    },
    quote: {
        type: Schema.Types.ObjectId,
        ref: 'Quote',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Bids", bidSchema, 'bids');
