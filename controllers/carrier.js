const User = require('../models/user');
const Fleet = require('../models/fleet');
const Alert = require('../models/alert');
const Subscribe = require('../models/subscribe');

const Jobs = require('../models/jobs');
const Bid = require('../models/bid');
const Quote = require('../models/get-a-quote');
const Aws = require('./awsController');


const { validationResult } = require('express-validator/check');
const config = require('../config')
const stripe = require('stripe')(config.stripeKey);


exports.updateCarrierProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ 'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false })
    }

    let id = req.session.user._id;

    const { email } = req.body;

    let user = await User.findById(id)

    if (user.email !== email) {
        let isExists = await User.findOne({ email: email })

        if (isExists) {
            return res.status(401).json({ 'error': 'USER_EXISTS', 'msg': 'User Already Exists!', status: false })
        }

    }


    User
        .findByIdAndUpdate(id, req.body)
        .then((user) => {
            req.session.user = user;
            req.session.save(err => {
                return res.status(201).json({ 'msg': 'Carrier updated Successfully!', status: true })
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({ 'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Updating Carrier!', status: false })

        })
}



exports.updateCarrierFleet = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ 'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false })
    }

    let id = req.session.user._id;

    const fleetData = {
        truck: {
            primeMover: req.body.primeMover,
            craneTruck: req.body.craneTruck,
            tiltTray: req.body.tiltTray,
            regidBeavertail: req.body.regidBeavertail,
            regidFlattop: req.body.regidFlattop,
            regidPantech: req.body.regidPantech,
            regidWithTailgator: req.body.regidWithTailgator,
            retriverTowTruck: req.body.retriverTowTruck,
        },
        trailer: {
            dropDeck: req.body.dropDeck,
            flatTop: req.body.flatTop,
            curtainSlider: req.body.curtainSlider,
            deckWinder: req.body.deckWinder,
            lowLoader: req.body.lowLoader,
            carCarrier: req.body.carCarrier,
            dolly: req.body.dolly,
            refrigrated: req.body.refrigrated,
            sideLoader: req.body.sideLoader,
            skel: req.body.skel,
            megaTilt: req.body.megaTilt,
            platform: req.body.platform,
            wakingFloor: req.body.wakingFloor,
            liveStock: req.body.liveStock,
            grainTrailer: req.body.grainTrailer,
            tipper: req.body.tipper,
            extendable: req.body.extendable,
            sideTipper: req.body.sideTipper,
            tanker: req.body.tanker,
            dogTrailer: req.body.dogTrailer,
            horseFloat: req.body.horseFloat,
            logging: req.body.logging,
            poleJinker: req.body.poleJinker,
            pigTrailer: req.body.pigTrailer
        },
        configrations: {
            bDouble: req.body.bDouble,
            roadTrain: req.body.roadTrain
        },
        other: {
            pilot: req.body.pilot,
            hotshot: req.body.hotshot,
            ute: req.body.ute,
            depotFacilities: req.body.depotFacilities,
            bobtailOperator: req.body.bobtailOperator,
            driveHire: req.body.driveHire,
            tradePlates: req.body.tradePlates
        }
    }


    Fleet
        .findOneAndUpdate({ userId: id }, fleetData)
        .then((fleet) => {
            return res.status(201).json({ 'msg': 'Fleet updated Successfully!', status: true })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({ 'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Updating Fleet!', status: false })

        })

}


exports.updateCarrierAlert = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ 'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false })
    }

    let id = req.session.user._id;

    Alert
        .findOneAndUpdate({ userId: id }, req.body)
        .then((fleet) => {
            return res.status(201).json({ 'msg': 'Alert updated Successfully!', status: true })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({ 'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Updating Alert!', status: false })

        })

}


exports.updateCarrierSubscription = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ 'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false })
    }

    let id = req.session.user._id;

    const { token, plan, expiration } = req.body;

    charge = await stripe.charges.create({
        amount: +plan * 100,
        currency: 'usd',
        description: 'Carrier Subscription Charge from Truck Loads',
        source: token,
    });

    if (charge.status === 'succeeded') {
        Subscribe
            .findOneAndUpdate({ userId: id }, { plan, expiration })
            .then(() => {
                return res.status(201).json({ 'msg': 'Alert updated Successfully!', status: true })
            })
            .catch(err => {
                console.log(err);
                return res.status(401).json({ 'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Updating Subscription!', status: false })
            })
    } else {
        console.log(err)
        return res.status(500).json({ 'error': 'INTERNAL_SERVER', 'msg': 'error in Subscription!', status: false });
    }
}


exports.getCarrierJobs = (req, res, next) => {

    const id = req.session.user._id;

    Jobs
        .find({ carrier: id })
        .populate('job')
        .then((data) => {
            finalData = [];
            data.forEach(d =>{
                let qouteData = [];

                qouteData.push(d.job.type);
                qouteData.push(d.job.pickup);
                qouteData.push(d.job.deliver);
                qouteData.push(d.job.status);
                qouteData.push(`<a href='/shipment-detail/${d.job._id}'><i class='fa fa-eye '></i></a>`);

                finalData.push(qouteData);

            })
            return res.status(200).json({ 'msg': 'user Quotes fetched successfuly!', data: finalData });

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ 'error': 'INTERNAL_SERVER', 'msg': 'Internal Server error while fetching user quotes', status: false })

        })
}

exports.doBid = (req, res, next) => {
    const { bid, time, proposal, quote } = req.body;
    let user = req.session.user._id;

    let newBid = new Bid({
        bid,
        time,
        proposal,
        quote,
        user
    })

    console.log(newBid)

    newBid
        .save()
        .then(() => {
            Quote
                .findById(quote)
                .populate('userId')
                .then(async (quote) => {

                    console.log(quote)
                    let postId = quote._id; 
                    let email = (quote.userId.email);
                    let title = quote.title;
                    let host=req.get('host');
                    let subject = "You have Recieved a new Bid";
                    let link="http://"+host+"/shipment-detail/" + postId ;

                    let html = `Hello,<br> Please Check you have a new Bid on your Post ${title}.<br> Click here to see That one <a href=${link}>See</a> `        

                    let isMailSend = await Aws.sendMail(link, email, subject, html);

                    console.log(isMailSend ? 'Mail Send' : 'Mail Not send')
                    
                })
            return res.status(200).json({'msg': 'Bid Successfully!'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Placing Bid'})
        })
    
}

exports.getSelectedQuote = (req,res,next) => {
    const user = req.session.user._id;

    Bid
        .find({user: user})
        .then((quotes) => {
            
            return res.status(200).json({'msg': 'seleted quotes get successfully!!', data: quotes})

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Getting Selected Quotes '})

        }) 
}