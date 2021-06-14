const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    item:{
        type: String
    },
    shippedDate:{
        type:String
    },
    pickupAddress :{
        type:String
    },
    DeliveryAddress:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    },
    cancellation:{
        type:Boolean,
        default:false
    },
    shipperId:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    carrierId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

},
   {
       timestamps:true,
       versionKey:false
   })

 module.exports = mongoose.model("Invitation",invitationSchema,'invitation');  