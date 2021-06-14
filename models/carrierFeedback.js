const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carrierFeedbackSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Quote',
        required: true
    },
    reason: {
        type: String,
        trim:true
    },
    stars: {
        type: Number,
        trim:true
    },
    feedback: {
        type: String,
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

module.exports = mongoose.model("carrierFeedback", carrierFeedbackSchema, 'carrierFeedbacks');
