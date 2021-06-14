const express = require('express');
const postRouter = express.Router();
const AuthController = require('../controllers/auth');
const AdminController = require('../controllers/admin')
const QuoteController = require('../controllers/get-a-quote');
const User = require('../models/user');
const chatController  = require('../controllers/chatController');
const shipperController = require('../controllers/shipper');
const carrierController = require('../controllers/carrier');
const invitationController = require('../controllers/invitationController'); //ankur 
const truckController = require('../controllers/truckController');

const isAuthenticated = require('../middleware/auth');
const fs = require('fs');
const multer = require('multer');

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        console.log("file",file)
        if (file.fieldname === 'myfile') {
          fs.mkdir('./uploads/',(err)=>{
            cb(null, 'uploads');
         });
          // cb(null, 'uploads'); 
        } 
    }, 
    filename: (req, file, cb) => { 
        cb(null,  Date.now() + file.originalname) 
    } 
}); 

const fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) { 
      cb(null, true);
    } else {
      cb(null, false);
    }
};

var upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
})


postRouter.post('/login',  AuthController.login);

postRouter.post('/logout',  isAuthenticated ,AuthController.logout);

postRouter.post('/forget-password',  AuthController.forgetPassword);

postRouter.post('/change-password',  AuthController.changePassword);

postRouter.post('/add-admin',  AdminController.addAdmin);


postRouter.post('/end-job', isAuthenticated, QuoteController.endJob);

// Shippers
postRouter.post('/shipper-signup',  AuthController.shipperSignup);

postRouter.post('/update-shipper',  shipperController.updateShipper);

postRouter.post('/get-shipper-posts', isAuthenticated , shipperController.getShipperPosts);

postRouter.post('/assign-job', isAuthenticated , shipperController.assignJob);

postRouter.post('/decline-job', isAuthenticated , shipperController.declineJob);

//This api use for send otp on phone no for verification
postRouter.post('/send-opt',AuthController.sendVerificationOtp);

//This api use for verify opt send on phone no
postRouter.post('/check-opt',AuthController.checkVerificationOtp);

// Carrier
postRouter.post('/carrier-profile-signup', AuthController.carrierProfile); 

//This api use  for add invitation send by shipper to the carrier
postRouter.post('/add-invitation',invitationController.addInvitationShipper);

//this api is use for add profile pic 
postRouter.post('/add-profile-pic',upload.single('myfile'), AuthController.addProfilePic);

//this api is use for save the truck information
postRouter.post('/add-truck',upload.single('myfile'),truckController.saveTruck);

//this api is use for update (edit) the truck information
postRouter.post('/edit-truck',upload.single('myfile'),truckController.editTruck);

postRouter.post('/carrier-fleet-signup', AuthController.carrierFleet);

postRouter.post('/carrier-alerts-signup', AuthController.carrierAlert);

postRouter.post('/carrier-subscribe-signup', AuthController.carrierSubscription);

postRouter.post('/update-carrier-profile', carrierController.updateCarrierProfile);

postRouter.post('/update-carrier-fleet', carrierController.updateCarrierFleet);

postRouter.post('/update-carrier-alert', carrierController.updateCarrierAlert);

postRouter.post('/update-carrier-subscription', carrierController.updateCarrierSubscription);

postRouter.post('/get-a-quote', isAuthenticated ,upload.single('myfile') , QuoteController.postQuote);

postRouter.post('/get-carrier-jobs', isAuthenticated , carrierController.getCarrierJobs);

postRouter.post('/do-bid', isAuthenticated , carrierController.doBid);

postRouter.post('/get-selected-quote', isAuthenticated , carrierController.getSelectedQuote);

postRouter.post('/get-selected-quote', isAuthenticated , carrierController.getSelectedQuote);



// chat 

postRouter.post('/setup-chat', isAuthenticated , chatController.setupChat);

postRouter.post('/get-rest-messages', isAuthenticated , chatController.getRestMessages);





// admin

postRouter.post('/admin-login', AdminController.addAdmin)

postRouter.post('/admin-signin', AdminController.loginAdmin);




module.exports = postRouter;