const Quote = require('../models/get-a-quote')
const Stats = require('../models/stats');
const Jobs = require('../models/jobs');
const User = require('../models/user');

const CarrierFeedBack = require('../models/carrierFeedback');
const ShipperFeedback = require('../models/shipperFeedback');
const { validationResult } = require('express-validator/check');
const Aws  =require('./awsController');

const fs = require('fs');
const path = require('path');
const cities = require('../database/cities');
const awsController = require('./awsController');
const NodeGeocoder = require('node-geocoder');
const config = require('../config'); 
const user = require('../models/user');
const { constants } = require('http2');

const options = {
    provider: 'google', 
    apiKey: config.googleKey 
};

const geocoder = NodeGeocoder(options);


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
                    resolve(data)
                })
                .catch(err => {
                    resolve(err)
                })

        })            
    })
            
}

exports.postQuote = async (req,res,next) => {
    const errors = validationResult(req);
    var jobCount ;
    var allowFreeJob;
    if (!errors.isEmpty()) {
        res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const file = req.file;

    if(!file) {
        return res.status(401).json({'error': 'INVALID_FILE', 'msg': 'Please selecte file of type jpg/png/jpeg', status: false})
    }

    const {title, pickup, deliver, availibility, date, description, length, width, height, weight, budget , type} = req.body;
    
    if((cities.includes(pickup.trim()) && cities.includes(deliver.trim())) === false) {
        return res.status(401).json({'error': 'INVALID_SUBURB', 'msg': 'suburb is invalid', status: false});
    } 

    await User.findOne({_id:req.session.user._id},function(err,userData){
        if(err){
            return res.status(401).json({'error': 'INTERNAL_SERVER', 'msg': 'There some internal  server error', status: false})
        }else{
            jobCount = userData.freeJob;
        }
    })

    if(jobCount >= 1){
        jobCount = jobCount-1;
        await User.updateOne({_id:req.session.user._id},{$set:{freeJob:jobCount}},function(err,result){
            if(err){
                return res.status(401).json({'error': 'INTERNAL_SERVER', 'msg': 'There some internal  server error', status: false})
            }else{
                allowFreeJob = true;
            }
        })
    }else{
        allowFreeJob = false;
    }
    

    if(allowFreeJob == true )
    {
        console.log("you do the job")
        let time = new Date();
        let fileContent = await fs.readFileSync(file.path);
        let uploadedImage = await awsController.uploadAws('qoutesimages', file.filename, fileContent, file.mimetype)
    
        const quote = Quote({
            'title': title,
            'pickup': (await geocoder.geocode(pickup))[0].formattedAddress,
            'deliver': (await geocoder.geocode(deliver))[0].formattedAddress,
            'availibility': availibility,
            'description': description,
            'date': date,
            'length': +length,
            'width': +width,
            'height': +height,
            'weight': +weight,
            'image': uploadedImage.Location,
            'budget': +budget,
            'pickupLocations': {
                'lat': (await geocoder.geocode(pickup))[0].latitude,
                'lng': (await geocoder.geocode(pickup))[0].longitude
            },
            'deliverLocations': {
                'lat': (await geocoder.geocode(deliver))[0].latitude,
                'lng': (await geocoder.geocode(deliver))[0].longitude
            },
            'type':type,
            'status': 'Live',
            'userId': req.session.user._id,
            'expiresIn': time.setDate(time.getDate() + 30)
        })
    
        fs.unlinkSync(file.path);
    
        
    
        quote
            .save()
            .then(async(quote) => {
                
                let host=req.get('host');
                let subject = "Job is Live";
                let link="http://"+host+"/shipment-detail/" + quote._id ;
                let email = req.session.user.email;
                let html = `Hello,<br>Your Job  ${quote.title} is Live on Truck Loads.<br> Click here to see That one <a href=${link}>See</a> `        
    
                await Aws.sendMail(link, email, subject, html);
    
                Stats
                    .findOne({user: req.session.user._id})
                    .then((userStat) => {
                        
                            userStat['JobsPost'] = userStat['JobsPost'] + 1;
                            return userStat.save();
                        
                    })
                    .then((data) => {
                        console.log('Stats added Or UPdated Successfully!')
                    return res.status(201).json({'msg': 'Quote saved successfully!', status: true})
    
                    })
                    .catch(err => {
                        console.log(err)
                        console.log('error in adding or updating stats')
                    })
    
            })
            .catch(err => {
                console.log(err)
                return res.status(403).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Saving qoute', status: false})
            })
    }else{
        console.log("no -------job alible");
        
    }
    
}



exports.getQuote = (req,res,next) => {
    
    var date = new Date();
    date.setDate(date.getDate() - 30)
    Quote
        .find({status: 'Live',  createdAt: { $gte: date } })
        .populate('userId')
        .then((response) => {
            return res.status(200).json({'msg': 'Quotes Fetched successfully!', data: response})
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server error while fetching quotes', status: false})
        })
}  

function addCarrierFeedback(job,reason,stars, feedback, user) {
    
   return new Promise((resolve, reject) => {
        let carrierfeedback = new CarrierFeedBack({
            job,
            reason,
            stars,
            feedback,
            user
        })
    
        carrierfeedback
            .save()
            .then((feed) => {
                resolve(feed)
            })
            .catch(err => {
                resolve(err)
            })
    })
    
}


function addShipperFeedback(job,reason,stars, feedback, user) {
    
    return new Promise((resolve, reject) => {
         let shipperfeedback = new ShipperFeedback({
             job,
             reason,
             stars,
             feedback,
             user
         })
     
         shipperfeedback
            .save()
             .then((feed) => {
                 resolve(feed)
             })
             .catch(err => {
                 resolve(err)
             })
     })
     
 }

exports.endJob = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {job,reason,stars,feedback} = req.body;
    let user = req.session.user;

    Jobs
    .findOne({job: job})
    .populate('job carrier')
    .then(async (data) => {


        if(!data) {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Something went worng!'})
        }

        
        updateStats(user._id, 'done')
        .then((data) => {
            console.log(data)    
        })
        .catch(err => {
            console.log(err)
        })
        

        data.job.status = reason;
        let isSaved = await data.job.save();

        if (isSaved) {
            if(!data.status) {
                data.status = reason;
                data.jobEndBy = user._id;  

            }

            let Observable;

            if(user.role === 'Carrier') {
                Observable = addCarrierFeedback(job,reason,stars,feedback, user._id)

            } else {
                Observable = addShipperFeedback(job,reason,stars,feedback, user._id);

                let host=req.get('host');
                let subject = "Job is Ended";
                let link="http://"+host+"/shipment-detail/" + data.job._id ;
                let email = data.carrier.email;
                let html = `Hello,<br>Your Bid on ${data.job.title} has been Ended.<br> Click here to see That one <a href=${link}>See</a> `        

                await Aws.sendMail(link, email, subject, html);

            }



            Observable
                .then(async(feed) => {
                    if(user.role === 'Carrier') {
                        data.carrierFeedback = feed._id;
                    } else {
                        data.shipperFeedback = feed._id;
                    }

                    await data.save();

                    return res.status(200).json({'msg': 'Job is completed successfully!', 'user': user.firstName + ' ' + user.lastName   })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in feedback!'})
                })


        } else {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in saving job!'})
            
        }

    })
    .catch(err => {
        console.log(err)
    })

}