const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Quote',
        required: true
    },
    carrier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carrierFeedback: {
        type: Schema.Types.ObjectId,
        ref: 'carrierFeedback',
    },
    shipperFeedback: {
        type: Schema.Types.ObjectId,
        ref: 'shipperFeedback',
    },
    status: {
        type: String,
        trim:true
    },
    jobEndBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Jobs", jobsSchema, 'jobs');
