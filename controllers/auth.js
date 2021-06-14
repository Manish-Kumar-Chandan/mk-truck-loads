const User = require('../models/user');
const Fleet = require('../models/fleet');
const Alert = require('../models/alert');
const Subscribe = require('../models/subscribe');
const config = require('../config');
const Stats = require('../models/stats')

const bcrypt = require('bcryptjs');
const stripe = require('stripe')(config.stripeKey);
const jwt = require('jsonwebtoken');
const aws = require('./awsController');
const awsController = require('./awsController');
const fs = require('fs');
const { validationResult } = require('express-validator/check');
var twilio = require('twilio');
var otpGenerator = require('otp-generator');

var client = new twilio(
    config.twilio.accountSid,
    config.twilio.authToken
);



function updateStep(id, step) {
    return new Promise(async (resolve, reject) => {
        resolve(await User.findByIdAndUpdate(id, {'step': step}))
    })
}

/**
 * This function are use for send otp on phone no and save otp in database
 * @param {useId,phone no} req //this is contain use id and phone no 
 * @param {*} res 
 * @param {*} next 
 */
exports.sendVerificationOtp = async (req, res, next) => {
    var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, digits: true, alphabets: false });
    var userId = req.body.id;
    var contactNumber = req.body.phone;
    var now = new Date();
    var expireTime = new Date(now.getTime() + 5 * 60000);
    var msg = otp + " This otp valid for 5 minutes"
    await User.updateOne({ _id: userId }, { $set: { otp: otp, otpExpire: expireTime } }, function (err, user) {
        if (err) {
            console.log("this is error", err)
        } else {
            client.messages.create({
                body: msg,
                to: '+919466767208',  // Text this number
                from: '+12056939883' // From a valid Twilio number
            })
                .then((message) =>
                 console.log(message.sid)
                 );
        }
    })
}   

/**
 * This function are use for check the sending otp are valid or not
 * @param {opt,id} req //This is contain otp and user id 
 * @param {*} res 
 * @param {*} next 
 */
exports.checkVerificationOtp = async (req,res,next) =>{
    var otp = req.body.otp;
    var now = new Date();
    // console.log("----",now);
    var userId = req.body.id;
    await User.findOne({_id:userId},function(err,user){
        if(err){
            res.send({
                status:400,
                data:{
                    msg:"there some error"
                }
            })
        }else{
            if(user != null){
                if(user.otp == otp && user.otpExpire > now){
                     User.updateOne({_id:userId},{$set:{phoneVerify:true}},function(err,result){
                        if(err){
                            res.send({
                                status:400,
                                data:{
                                    msg:"there some error"
                                }
                            }) 
                        }else{
                            console.log('update data',result)
                            res.send({
                                status:200,
                                data:{
                                    msg:"your otp are verify successfully"
                                }
                            })
                        }
                    })
        
                }else{
                    res.send({
                        status:200,
                        data:{
                            msg:"your otp or otp time are expires"
                        }
                    })
                }
            }else{
                res.send({
                    status:200,
                    data:{
                        msg:"there no use exits"
                    }
                })
            }
        }
    })


}
exports.verifyAccount = async (req,res,next) => {

    let id = req.query.id;

    jwt.verify(id, config.jwt.email.secretKey, (err, data) => {
        if(err) {
            return res.redirect('/bad-request')
        }
        let userData = data.data;

        User
            .findOne({email: userData.email})
            .then((user) => {
                if(user) {
                    return res.redirect('/bad-request');
                }


                bcrypt
                .hash(userData.password, 12)
                .then( async (hashedPassword) => {
                    let user;
                    if( userData.role === 'Shipper') {
                        user = await new User({
                            'username': userData.username,
                            'firstName': userData.firstName, 
                            'lastName': userData.lastName, 
                            'email': userData.email, 
                            'password':hashedPassword,  
                            'phone': userData.phone, 
                            'address': userData.address, 
                            'type': userData.type, 
                            'activated': true,
                            'role': userData.role})
        
                    } else if (userData.role === 'Carrier') {
                        user = await new User({
                            'username': userData.username,
                            'firstName': userData.firstName, 
                            'lastName': userData.lastName, 
                            'business': userData.business, 
                            'email': userData.email, 
                            'password': hashedPassword,  
                            'phone': userData.phone,  
                            'address': userData.address, 
                            'type': userData.type, 
                            'step': 1, 
                            'activated': true,
                            'role': userData.role})
                    }
                    
                    return user.save();
                })
                .then(async(user) => {

                    
                    const stats = new Stats({
                        JobsPost: 0,
                        jobsDone: 0,
                        jobsInProgress: 0,
                        user: user._id
                    })

                    await stats.save();

                   return  res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    return res.redirect('/bad-request')
                })
        
            })
            .catch(err => {
                return res.redirect('/bad-request');
            })
    })
    
}

exports.shipperSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {username, firstName, lastName, email, password, phone, address,type, role} = req.body;

    User
        .findOne({email: email})
        .then( async (user) => {
            if (user) {
                return res.status(401).json({'error': 'USER_EXISTS', 'msg': 'User Already Exists!', status: false})
            }

            const token = jwt.sign({
                data: req.body
            }, config.jwt.email.secretKey, { expiresIn: config.jwt.email.expiresIn });
              
            let host=req.get('host');
            let emailSend = await aws.sendConfirmationMail(token, host, email);

            if (emailSend) {
                return res.status(200).json({'msg': 'Email send Successfully!', status: true})
            } else {
                return res.status(500).json({'error': 'INVALID_EMAIL', 'msg': 'error in Sending Email!', status: false});
            }

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering shipper!', status: false});
        })

}


exports.carrierProfile = async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {username, firstName, lastName, business, email, password, phone, address,type, role} = req.body;

    User
        .findOne({
            email: email
        })
        .then(async (user) => {
            if (user) {
                return res.status(401).json({'error': 'USER_EXISTS', 'msg': 'User Already Exists!', status: false})
            }

            const token = jwt.sign({
                data: req.body
            }, config.jwt.email.secretKey, { expiresIn: config.jwt.email.expiresIn });
              
            let host=req.get('host');
            let emailSend = await aws.sendConfirmationMail(token, host, email);

            if (emailSend) {
                return res.status(200).json({'msg': 'Email send Successfully!', status: true})
            } else {
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Sending Email!', status: false});
            }

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering User!', status: false});
        })

}


exports.carrierFleet = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {userId } = req.body;

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
            bDouble: req.body.bDouble ,
            roadTrain: req.body.roadTrain
        },
        other: {
            pilot: req.body.pilot,
            hotshot: req.body.hotshot,
            ute :req.body.ute,
            depotFacilities: req.body.depotFacilities,
            bobtailOperator :req.body.bobtailOperator,
            driveHire: req.body.driveHire,
            tradePlates: req.body.tradePlates
        }
    }


    const fleetExists = await Fleet.findOne({userId: userId})
    

    if (!fleetExists) {

        const fleet = new Fleet({
            truck: fleetData.truck,
            trailer: fleetData.trailer,
            configrations: fleetData.configrations,
            other: fleetData.other,
            userId: userId
        })
    
        fleet
            .save()
            .then((fleet) => {
                let updatedSteps = updateStep(userId, 2);

                return  res.status(201).json({'msg': 'fleet registered successfully!', userId: userId ,status: true})
            })
            .catch((err => {
                console.log(err)
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering Fleet!', status: false});
    
            }))
    } else {
        let updatedFleet = await Fleet.findOneAndUpdate({userId: userId}, fleetData)
        return  res.status(201).json({'msg': 'fleet registered successfully!', userId: userId ,status: true})
        
    }

}


exports.carrierAlert = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    var {userId ,mobile, email} = req.body, alert;

    
    const alertsExists = await Alert.findOne({userId: userId})

    if (!alertsExists) {
        const alert = new Alert({
            mobile: mobile,
            email: email,
            userId: userId
        })

        alert
            .save()
            .then((alert) => {
                let updatedSteps = updateStep(userId, 3);
                return  res.status(201).json({'msg': 'Alerts registered successfully!', userId: userId ,status: true})

            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering Alerts!', status: false});
      
            })
    } else {
        let updatedAlert = await Alert.findOneAndUpdate({userId: userId}, alert)
        return  res.status(201).json({'msg': 'alert registered successfully!', userId: userId ,status: true})
    }
}


exports.carrierSubscription = async (req,res,next) => {

    const {token, plan,userId, expiration  } = req.body;

    let isSubscribed = await Subscribe.findOne({userId: userId})
    
    if(isSubscribed) {
        return  res.status(201).json({'msg': 'Already Subscribed!', userId: userId ,status: true})
    }

    if (plan !== 'FREE') {
        charge = await stripe.charges.create({
            amount: +plan *100,
            currency: 'usd',
            description: 'Carrier Subscription Charge',
            source: token,
        });
   
    } else {
        charge = {
            status: 'succeeded'
        }
    }
    
    const subscribe = new Subscribe({
        plan: plan,
        expiration: expiration
    })


    if (charge.status === 'succeeded') {

        const subscribe = new Subscribe({
            plan: plan,
            expiration: expiration,
            userId: userId
        })

        subscribe
            .save()
            .then(()=> {
                let updatedSteps = updateStep(userId, 4);
                return  res.status(201).json({'msg': 'Subscribe  successfully!', userId: userId ,status: true})

            })
            .catch((err) => {  
                console.log(err)
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in saving Subscription!', status: false});

            })
    } else {
        console.log(err)
        return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Subscription!', status: false});

    }
}

exports.login = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const { email, password, role, remember} = req.body;

    console.log(req.body)
    User
        .findOne({email: email , role: role})
        .then((user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "User Not Found", status: false})
            }

            if (!user.activated) {
                return res.status(401).json({"error": "NOT_ACTIVATED", "msg": "Account not activated", status: false})
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if(!doMatch) {
                        return res.status(401).json({"error": "INVALID_PASSWORD", "msg": "Password not Mached", status: false})
                    }

                    if (role === 'Carrier' && user.step < 4) {
                        return res.status(201).json({'msg': 'User Logged in', step: user.step, user: user._id, status: true})
                    }
                
                    req.session.isLoggedIn = true;
                    req.session.user = user;

                    if (!remember) {
                        req.session.cookie.maxAge =  8.64e+7;
                    } else {
                        req.session.cookie.maxAge =  3.942e+10
                    }

                    return req.session.save(err => {
                        console.log(err);
                        console.log(req.session)
                        return res.status(201).json({'msg': 'User Logged in', status: true})
                    });
                })
                .catch(err => {
                    return res.status(401).json({"error": "INTERNAL_SERVER", "msg": "Error in decrypt user Password", status: false})
                })
        })
        .catch(err => {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Login User!', status: false});
        })
}

exports.forgetPassword = (req,res,next) => {
    const {email} = req.body;

    User
        .findOne({email: email})
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "User Not Exists", status: false})
            }

            let host=req.get('host');
            
            const token = jwt.sign({
                data: {'email': user.email}
            }, config.jwt.password.secretKey, { expiresIn: config.jwt.password.expiresIn });

            let emailSend = await aws.forgetPasswordMail(token, host, email);

            if (emailSend) {
                return res.status(200).json({'msg': 'Email send Successfully!','email': email, status: true})
            } else {
                return res.status(500).json({'error': 'INVALID_EMAIL', 'msg': 'error in Sending Email!', status: false});
            }

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Login User!', status: false});
        })
}

exports.getChangePassword = (req,res,next) => {
    const id = req.query.id;

    
    jwt.verify(id, config.jwt.password.secretKey, (err, data) => {
        if (err) {
            return res.redirect('/bad-request');
        }

        const userData =  data.data

        return res.render('Pages/change-password', {
            title: 'Change Password',
            user: req.session.user,
            email: userData.email
      });
    })
}

exports.addProfilePic = async (req,res) =>{
    console.log(req.file);
    var file = req.file;
    let fileContent = await fs.readFileSync(file.path);
    let uploadedImage = await awsController.uploadAws('qoutesimages', file.filename, fileContent, file.mimetype);
    // console.log(uploadedImage)
     await fs.unlinkSync(file.path, function(err,result){
         if(err){
             console.log('error',error)
         }else{
             console.log(result)
         }
     })
   
    await User.updateOne({_id:req.session.user._id},{profilePic:uploadedImage.Location})
    .then((response) =>{

        console.log("update",response);
        return res.status(201).json({'msg': 'profile image saved successfully!', status: true})
    }).catch((error)=>{
        console.log("error",error);
        return res.status(403).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Saving Profile image', status: false})
    })
}



exports.changePassword = (req,res,next) => {
    const {email, password} = req.body;
    console.log("------",req.body);

    User
        .findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "User Not Exists", status: false})
            }

            bcrypt
                .hash(password, 12)
                .then( async (hashedPassword) => {
                    user.password = hashedPassword
                    return user.save()
                })
                .then((user) => {
                    return res.status(200).json({'msg': 'Password Change Successfully!','email': email, status: true})
                })
                .catch(err => {
                    return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Bcrypt Password!', status: false});

                })

        })
        .catch(err => {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Finding User on Change Password!', status: false});

        })
}



exports.logout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.status(201).json({'msg': 'User Logged Out', status: true});
      });
}