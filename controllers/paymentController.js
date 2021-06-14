const { payment } = require('paypal-rest-sdk');
const Subscribe = require('../models/subscribe');

exports.getAllPayment = async (req,res) =>{
    console.log('payment',req.session.user._id);
    var id = req.session.user._id
    await Subscribe.find({userId:id})
    .populate('userId')
    .then((paymentData) =>{
        console.log(paymentData);
        res.render('Pages/payment', {
            title: '',
            data: paymentData
        });
    })
}