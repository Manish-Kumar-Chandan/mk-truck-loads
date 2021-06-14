const express = require('express');
const routes = express.Router();

const isAuthenticated = require('../middleware/auth')
const isLoggedIn = require('../middleware/isLoggedIn');

const cities = require('../database/cities')
const quoteController = require('../controllers/get-a-quote')

const User = require('../models/user');
const Fleet = require('../models/fleet');
const Alert = require('../models/alert');
const Subscription = require('../models/subscribe');
const Stats = require('../models/stats');
const Quotes = require('../models/get-a-quote');
const Bids = require('../models/bid');
const Chat = require('../models/chat');
const Messsages = require('../models/messages');
const Jobs = require('../models/jobs');

const authController = require('../controllers/auth');

const checkShipper = require('../middleware/shipper');
const checkAdmin = require('../middleware/admin');
const checkAdminLoggedIn = require('../middleware/isAdminLoggedIn')
const checkNotAdmin = require('../middleware/checkNotAdmin');
const { config } = require('aws-sdk');
const configJson = require('../config');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const invitationController = require('../controllers/invitationController'); //ankur
const paymentController = require('../controllers/paymentController'); //ankur
const truckController = require('../controllers/truckController');
var socialEmail='';

passport.serializeUser(function(user, cb) {
      cb(null, user);
    });
    
    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });
/**
 * This function use for get the data from fb login 
 */
  passport.use(new FacebookStrategy({
      clientID: configJson.fb.clientID,
      clientSecret: configJson.fb.clientSecret,
      callbackURL: configJson.fb.callbackURL
    },
    async function(accessToken, refreshToken, profile, done) { 
        done(null,profile)
      //   await User.findOne({email:profile._json.email},function(err,userData){
      //       if(err){
      //             console.log("there some error")
      //       }else{
      //             socialEmail = profile._json.email;
      //             if(userData == null){
      //                   var user =  new User({
      //                    'username': profile._json.name,
      //                    'firstName': profile._json.given_name,
      //                    'lastName': profile._json.family_name,
      //                    'email':profile._json.email,
      //                    'password':"srk@123",
      //                    'phone':987654321,
      //                    'role':'Shipper',
      //                    'address':"f-8 home aus"
      //                   })
      //                    user.save();
      //                   done(null, profile);
      //             }else{
      //              done(null, profile);  
      //             }
      //       }
      //  })
 

    }
  ));

  /**
   * This function are use for the data from google login 
   */
  passport.use(new GoogleStrategy({
      clientID: configJson.google.clientID,
      clientSecret: configJson.google.clientSecret,
      callbackURL: configJson.google.callbackURL
    },
   async function(accessToken, refreshToken, profile, done) { 
       await User.findOne({email:profile._json.email},function(err,userData){
           if(err){
                 console.log("there some error")
           }else{
                 socialEmail = profile._json.email;
                 if(userData == null){
                       var user =  new User({
                        'username': profile._json.name,
                        'firstName': profile._json.given_name,
                        'lastName': profile._json.family_name,
                        'email':profile._json.email,
                        'password':"srk@123",
                        'phone':987654321,
                        'role':'Shipper',
                        'address':"f-8 home aus"
                       })
                        user.save();
                       done(null, profile);
                 }else{
                  done(null, profile);  
                 }
           }
      })

        
    }
  ));

/**
 * This route use for fb login and call facebook strategy function
 */
  routes.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['profile','email'] })
  );


/**
 * This route are call by fb after login the user 
*/ 
routes.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
      // await User.findOne({email:socialEmail},function(err,user){
      //       if(err){
      //             console.log(err);
      //       }else{
      //            req.session.isLoggedIn = true;
      //            req.session.user = user;
      //       }
      // })
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
  );

/**
 * This route are call google login and call GoogleStrategy
 */
  routes.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','profile','email'] }));

/**
 * This route are call by google and callback your website
 */
  routes.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function(req, res) {
       await User.findOne({email:socialEmail},function(err,user){
             if(err){
                  return res.status(401).json({"error": "INTERNAL_SERVER", "msg": "Error in login user", status: false})
             }else{
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  req.session.cookie.maxAge =  3.942e+10
                  res.redirect('/');
             }
       })
    // Successful authentication, redirect home.
//     res.redirect('/home');
  }
  );


routes.get('/', function(req, res)
{     
      if(req.session.user) {
            if (req.session.user.role === 'ADMIN') {
                  return res.redirect('/admin/dashboard')
        
            }     
      }
      res.redirect('/home')
});

routes.get('/change-password', authController.getChangePassword)

//this route use to  add for get invitation page
routes.get('/invitation',invitationController.getAllInvitation);

//this route use to show the all cancellation
routes.get('/all-cancellation',invitationController.getCancellation);

//this route use to accept invitation
routes.get('/accept',invitationController.acceptInvitation);

//this route use to cancel invitation
routes.get('/cancel',invitationController.cancelInvitation);

//this route use for get all payment 
routes.get('/all-payment', paymentController.getAllPayment);

//this route use for get all truck information
routes.get('/truck',isAuthenticated,checkNotAdmin,truckController.getTruckInfo);

//this route use for edit the truck Information
routes.get('/truck-edit-page',truckController.getTruckEditPage);

routes.get('/get-user-info',truckController.getUser);

routes.get('/home',checkNotAdmin, function(req, res)
{
      console.log("home -----",req.session.user)
      res.render('Pages/home/home', {
            title: 'home',
            user: req.session.user
      });
});

routes.get('/how-it-work/shippers',checkNotAdmin, function(req, res)
{
      res.render('Pages/how-it-work/shippers', {
            
            "title": "how-it-works"

      });
});

routes.get('/how-it-work/carriers', checkNotAdmin,function(req, res)
{
      res.render('Pages/how-it-work/carriers', {
            
            "title": "how-it-works"
      });
});

routes.get('/warehouse',checkNotAdmin, function(req, res)
{
      res.render('Pages/warehouse', {
            
            "title": "warehouse"
      });
});
routes.get('/about', checkNotAdmin,function(req, res)
{
      res.render('Pages/about', {
            
            "title": "how-it-works"
      });
});
routes.get('/login', isLoggedIn ,function(req, res)
{
      res.render('Pages/login', {
            "title": ""
      });
});



routes.get('/verify-account', authController.verifyAccount);



routes.get('/register', isLoggedIn,function(req, res)
{
      res.render('Pages/register/register', {
            
            "title": ""

      });
});
routes.get('/register-carrier', isLoggedIn,function(req, res)
{
      res.redirect('/register-carrier/profile');     
});

routes.get('/register-carrier/profile', function (req,res) {
      
      res.render('Pages/register/register-carrier', {
            
            "title": "",
            "page": 'Profile'
      });
})

routes.get('/register-carrier/fleet/:id',isLoggedIn, async function (req,res) {

      let {id} = req.params;
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Fleet',
                        "userId": user._id,
                        "fleet" : ''
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
})

routes.get('/register-carrier/alerts/:id',isLoggedIn, async function (req,res) {

      let {id} = req.params;
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Alerts',
                        "userId": user._id
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
      
})


routes.get('/register-carrier/subscribe/:id', isLoggedIn, function (req,res) {

      let {id} = req.params;
      
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Subscribe',
                        "userId": user._id
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
})


routes.get('/register-shipper', isLoggedIn,function(req, res)
{
      
      res.render('Pages/register/register-shipper', {
            
            "title": ""
      });
});


routes.get('/jobs', isAuthenticated, checkNotAdmin,function(req, res)
{
            res.render('Pages/jobs', {
                  
                  "title": "jobs"
            });
      
});


routes.get('/privacy-policy',checkNotAdmin, function(req, res)
{
      res.render('Pages/privacy', {
            
            "title": ""

      });
});

routes.get('/terms-condition',checkNotAdmin, function(req, res)
{
      res.render('Pages/terms', {
            
            "title": ""

      });
});

routes.get('/get-a-quote/cars',isAuthenticated , checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'cars',
            "user": req.session.user,
            "title": "get-a-quote"

      });
});
routes.get('/get-a-quote/bike', isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'bike',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/furniture',isAuthenticated,checkShipper, checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'furniture',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/boat',isAuthenticated,checkShipper, checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'boat',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/home',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'home',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/pallets', isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'pallets',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/waste',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'waste',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/trucks',isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'trucks',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/trucks',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'trucks',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/other-vehicle',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'other-vehicle',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/container',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'container',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/houlage',isAuthenticated,checkShipper, checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'houlage',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/livestock',isAuthenticated,checkShipper, checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'livestock',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/heavy',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'heavy',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/agriculture',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'agriculture',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/mining-machine',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'mining-machine',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/automotive',isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'automotive',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/refrigrated',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'refrigrated',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/warehouse',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'warehouse',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});



routes.get('/shipment-detail/:id',isAuthenticated,checkNotAdmin, async function(req, res)
{

      const id = req.params.id;

      let quote = await Quotes.findById(id)
      
      if (!quote) {
            return res.redirect('/profile');
      }     

      let bids = await Bids.find({quote: id}).populate('user quote');
      Jobs
            .findOne({job: id})
            .populate({
                  path: 'carrierFeedback',
                  model: 'carrierFeedback',
                  populate: {
                        path: 'user',
                        model: 'User'
                  }
            })
            .populate({
                  path: 'shipperFeedback',
                  model: 'shipperFeedback',
                  populate: {
                        path: 'user',
                        model: 'User'
                  }
            })
            .populate('job')
            .then((jobs) => {
                  res.render('Pages/shipment-details-page', {
                        "page": "Shipment Details",
                        "user": req.session.user,
                        "bids": bids,
                        "jobs": jobs,
                        "quote": quote,
                        "title": ""
                  });
            })

      
      
});


routes.get('/profile',isAuthenticated,checkNotAdmin, async function(req, res)
{
      let id = req.session.user._id;
      let user = await User.findById(id);
      let fleet, alerts, subscription, stats = '';
      
      if(req.session.user.role === 'Carrier') {
            fleet = await Fleet.findOne({userId: id});
            alerts = await Alert.findOne({userId: id});
            subscription = await Subscription.findOne({userId: id});
      }

      stats = await Stats.findOne({user: id})
      
      res.render('Pages/profile', {
            "user": user,
            "fleet": fleet,
            "alerts": alerts,
            "subscription": subscription, 
            "stats": stats,
            "title": ""
      });
});

routes.get('/track-order',isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/track-order', {
            "user": req.session.user,
            "title": "jobs"

      });
});


routes.get('/chat',isAuthenticated,checkNotAdmin, function(req, res)
{

      let user = req.session.user._id;

      Chat
            .find({ $or: [{ carrier: user }, { shipper:  user}] }) 
            .populate('carrier shipper job')
            .sort([['createdAt', -1]])
            .then((chats) => {
                  res.render('Pages/chat', {
                        "user": req.session.user,
                        "title": "chat",
                        "chats": chats,
                        "messages": null,
                        "open": false,
                        "chat": '',
                        'job': ''
                  });
            })
            .catch(err => {
                  console.log(err)
                  return res.redirect('/bad-request')
            })
      
});



routes.get('/chat/:id',isAuthenticated,checkNotAdmin, function(req, res)
{
      let chatId = req.params.id;
      let user = req.session.user._id;

      Chat
      .find({ $or: [{ carrier: user }, { shipper:  user}] }) 
      .populate('carrier shipper job')     
      .sort([['createdAt', -1]])
      
      .then(async (chats) => {

            let chat = await Chat.findById(chatId).populate('carrier shipper job')

            let job = await Jobs.findOne({job: chat.job })            

            if(!chat) {
                  return res.redirect('/bad-request')
            }

            Messsages
            .find({chat: chatId})
            .sort([['createdAt', -1]])
            .limit(20)
            .then((messages) => {


                  messages = messages.reverse()
                  res.render('Pages/chat', {
                        "user": req.session.user,
                        "title": "chat",
                        "chats": chats,
                        "messages": messages,
                        "open": true,
                        "chat": chat,
                        'job': job
                  });
            })
            .catch(err => {
                  console.log(err)
                  return res.redirect('/bad-request')
            })
      })
      
      .catch(err => {
            console.log(err)
            return res.redirect('/bad-request')
      })

});





routes.get('/feedback',isAuthenticated,checkNotAdmin, function(req, res)
{
      res.render('Pages/feedback', {
            "user": req.session.user,
            "title": ""
      });
});

routes.get('/get-quotes', isAuthenticated ,checkNotAdmin, quoteController.getQuote );

// Admin Routes

routes.get('/admin/dashboard',checkAdmin , function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'dashboard',
            user: req.session.user
      });
});

routes.get('/admin/signin', checkAdminLoggedIn,function(req, res)
{
      res.render('Pages/admin/signin',{
            "user": req.session.user,
            "title": ""
      });
});



routes.get('/admin/shippers', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'shippers',
            user: req.session.user
      });
});


routes.get('/admin/shipment/:id', function(req, res)
{


      res.render('Pages/admin/admin', {
            page: 'shipment-details',
            user: req.session.user
      });
});


routes.get('/admin/carriers', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'carriers',
            user: req.session.user
      });
});

routes.get('/admin/payment', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'payment',
            user: req.session.user
      });
});

routes.get('/admin/email', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'email',
            user: req.session.user
      });
});

routes.get('/admin/feedback', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'feedback',
            user: req.session.user
      });
});


routes.get('/get-cities', (req,res,next) => {
      res.status(200).json({'msg': 'cities', 'cities':  cities})
})

routes.get('/bad-request', (req,res,next) => {
      return res.render('Pages/pages_500',{
            "user": req.session.user,
            "title": ""
      });
})

routes.get('/forget-password', (req,res,next) => {
      return res.render('Pages/forget-password',{
            "user": req.session.user,
            "title": ""
      });
})


routes.get('/**', (req,res,next) => {
      return res.render('Pages/pages_404',{
            "user": req.session.user,
            "title": ""
      });
})


module.exports = routes;