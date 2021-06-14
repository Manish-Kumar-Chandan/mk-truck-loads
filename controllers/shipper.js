const User = require('../models/user');
const Quote = require('../models/get-a-quote');
const Jobs = require('../models/jobs');
const Bids = require('../models/bid');
const Stats = require('../models/stats')
const Aws = require('./awsController')
const { validationResult } = require('express-validator/check');


exports.updateShipper = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const id = req.session.user._id;
    
    const {email} = req.body;

    let user = await User.findById(id)

    if (user.email !== email ) {
        let  isExists = await User.findOne({email: email})

        if (isExists) {
                return res.status(401).json({'error': 'USER_EXISTS', 'msg': 'User Already Exists!', status: false})
        }

    } 

    
    User
        .findByIdAndUpdate(id, req.body)
        .then((user) => {

            req.session.user = user;
            req.session.save(err => {
                console.log(req.session.user)
                return  res.status(201).json({'msg': 'Shipper updated Successfully!', status: true})
            })
            

        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Updating Shipper!', status: false})

        })

}


exports.getShipperPosts = (req,res,next) => {
    
    const {userId} = req.body;

    Quote   
        .find({userId})
        .then((quotes) => {

            let  data = []

            quotes.forEach((quote) => {
                let qouteData = [];

                qouteData.push(quote.type);
                qouteData.push(quote.pickup);
                qouteData.push(quote.deliver);
                qouteData.push(quote.status);
                qouteData.push(`<a href='/shipment-detail/${quote._id}'><i class='fa fa-eye '></i></a>`);

                data.push(qouteData);
            })

            return res.status(200).json({'msg': 'user Quotes fetched successfuly!', data: data});

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server error while fetching user quotes', status: false})  
        })
}


function updateStats (user, jobs) {

    return new Promise((resolve,reject) => {
        Stats
        .findOne({user: user })
        .then(async(userStat) => {


            if (jobs === 'done') {
                userStat.jobsDone = userStat.jobsDone + 1 
            } else if (jobs === 'progress') {
                userStat.jobsInProgress = userStat.jobsInProgress + 1 
            }
            
            
            userStat.save()
                .then((data)=> {
                    console.log(data)
                    resolve(data)
                })
                .catch(err => {
                    resolve(err)
                })

        })            
    })
            
}

exports.assignJob = async (req,res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {carrier,job} = req.body;

    console.log(req.body);

    await updateStats(carrier, 'progress');

    await updateStats(req.session.user._id, 'progress');

    let jobs = new Jobs({
        job,
        carrier
    })

    jobs
        .save()
        .then(() => {

            Quote
                .findById(job)
                .then(async (job) => {
                    job.status = 'In Progress'

                    let user = await User.findById(carrier)
                    
                    let host=req.get('host');
                    let subject = "You have Assign a new Job";
                    let link="http://"+host+"/shipment-detail/" + job._id ;
                    let email = user.email;
                    let html = `Hello,<br> Please Check you have assign a new Job  ${job.title}.<br> Click here to see That one <a href=${link}>See</a> `        

                    await Aws.sendMail(link, email, subject, html);

                    job.save()
                        .then(()=> {
                            return res.status(200).json({'msg': 'job assign to user succcessfully!'});
                        })
                        .catch(err => {
                            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Assigning Job'})

                        })
                })
        })
        
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error in Assigning Job'})
        })
}

exports.declineJob = async(req,res,next) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {bid,carrier, job} = req.body;

    let deleteBid = await Bids.findByIdAndDelete(bid);

    if (deleteBid) {
       let user =  await User.findById(carrier);

       if (user) {
            let quote = await Quote.findById(job)
            let host=req.get('host');
            let subject = "Job is decline";
            let link="http://"+host+"/shipment-detail/" + quote._id ;
            let email = user.email;
            let html = `Hello,<br>Your Bid on ${quote.title} has been declined.<br> Click here to see That one <a href=${link}>See</a> `        

            await Aws.sendMail(link, email, subject, html);

            return res.status(200).json({'msg': 'bid declined successfully!'})
            
       } else {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in finding user'})

       }

    } else {
        return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in deleting Bids'})
    }
    
}