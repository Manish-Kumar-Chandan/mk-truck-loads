const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const truckSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    truckName:{
        type: String,
        required: true,
        trim:true
    },
    truckNumber:{
        type:String,
        required: true,
        trim:true
    },
    comment:{
        type:String,
        required: true,
        trim:true
    },
    date:{
        type:String,
        required: true,
        trim:true
    },
    companyName:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true
    },
    phone:{
        type:String,
        required: true,
        trim:true
    },
    truckImage:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    is_delete :{
        type:Boolean,
        default:false
    }

},
   {
       timestamps:true,
       versionKey:false
   })

 module.exports = mongoose.model("Truck",truckSchema,'truck'); 