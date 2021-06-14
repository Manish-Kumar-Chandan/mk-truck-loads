const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fleetSchema = new Schema({
    truck: {
        primeMover: {
            type: String,
            trim:true
        },
        craneTruck: {
            type: String,
            trim:true
        },
        tiltTray: {
            type: String,
            trim:true
        },
        regidBeavertail: {
            type:String,
            trim:true
        },
        regidFlattop: {
            type:String,
            trim:true
        },
        regidPantech: {
            type:String,
            trim:true
        },
        regidWithTailgator: {
            type:String,
            trim:true
        },
        retriverTowTruck: {
            type:String,
            trim:true
        }
    },
    trailer: {
        dropDeck: {
            type:String,
            trim:true
        },
        flatTop: {
            type:String,
            trim:true
        },
        curtainSlider: {
            type:String,
            trim:true
        },
        deckWinder: {
            type:String,
            trim:true
        },
        lowLoader: {
            type:String,
            trim:true
        },
        carCarrier: {
            type:String,
            trim:true
        },
        dolly: {
            type:String,
            trim:true
        },
        refrigrated: {
            type:String,
            trim:true
        },
        sideLoader: {
            type:String,
            trim:true
        },
        skel: {
            type:String,
            trim:true
        },
        megaTilt: {
            type:String,
            trim:true
        },
        platform: {
            type:String,
            trim:true
        },
        wakingFloor: {
            type:String,
            trim:true
        },
        liveStock: {
            type:String,
            trim:true
        },
        grainTrailer: {
            type:String,
            trim:true
        },
        tipper: {
            type:String,
            trim:true
        },
        extendable: {
            type:String,
            trim:true
        },
        sideTipper: {
            type:String,
            trim:true
        },
        tanker: {
            type:String,
            trim:true
        },
        dogTrailer: {
            type:String,
            trim:true
        },
        horseFloat: {
            type:String,
            trim:true
        },
        logging: {
            type:String,
            trim:true
        },
        poleJinker: {
            type:String,
            trim:true
        },
        pigTrailer: {
            type:String,
            trim:true   
        }
    },
    configrations: {
        bDouble: {
            type:String,
            trim:true
        },
        roadTrain: {
            type:String,
            trim:true
        }
    },
    other: {
        pilot: {
            type:String,
            trim:true
        },
        hotshot: {
            type:String,
            trim:true
        },
        ute: {
            type:String,
            trim:true
        },
        depotFacilities: {
            type:String,
            trim:true
        },
        bobtailOperator: {
            type:String,
            trim:true
        },
        driveHire: {
            type:String,
            trim:true
        },
        tradePlates: {
            type:String,
            trim:true
        }
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

module.exports = mongoose.model("Fleet", fleetSchema, 'fleets');
