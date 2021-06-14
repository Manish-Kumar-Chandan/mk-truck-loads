const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    'title': {
        type: String,
        required: true,
        trim: true
    },
    'pickup': {
        type: String,
        required: true,
        trim: true
    },
    'deliver': {
        type: String,
        required: true,
        trim: true
    },
    'availibility': {
        type: String,
        required: true,
        trim:true
    },
    'description': {
        type: String,
        required: true,
        trim: true
    },
    'date': {
        type: Date,
        trim:true
    },
    'length': {
        type: Number,
        required: true,
        trim: true
    },
    'width': {
        type: Number,
        required: true,
        trim:true
    },
    'height': {
        type: Number,
        required: true,
        trim:true
    },
    'weight': {
        type: Number,
        required: true,
        trim:true
    },
    'image': { 
        type: String,
        required: true 
    },
    'budget': {
        type: Number,
        required: true,
        trim:true
    },
    'pickupLocations': {
        'lat': {
            type: Number,
            required: true
        },
        'lng':{
            type: Number,
            required: true
        }         
    },
    'deliverLocations': {
        'lat': {
            type: Number,
            required: true
        },
        'lng':{
            type: Number,
            required: true
        } 
    },
    'userId': {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    'type': {
        type: String,
        required: true,
        trim:true
    },
    'status': {
        type: String,
        required: true,
        trim:true
    },
    'expiresIn': {
        type: Date,
        required: true,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Quote", quoteSchema, 'quotes');
