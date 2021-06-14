const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statsSchema = new Schema({

    JobsPost: {
        type: Number,
        trim: true
    },
    jobsDone: {
        type: Number,
        trim: true
    },
    jobsInProgress: {
        type: Number,
        trim: true   
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

module.exports = mongoose.model("Stats", statsSchema, 'stats');
