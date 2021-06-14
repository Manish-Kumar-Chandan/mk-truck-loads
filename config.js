module.exports = {
    mongoUrl : 'mongodb://localhost:27017/truckloads',
    stripeKey: 'sk_test_aWM6xSsKwEGjnm4YcM2kFE3600yta0e0ez',
    aws: {
        accessKey: 'AKIAJMIIKCUWU56OONVQ',
        secretKey: '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',
        region: 'ap-southeast-2'
    },
    fb:{
        clientID: 483101469032634,
        clientSecret: "5311cb56a7206b36c1778720808e2153",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    google:
    {
        clientID: "94351082681-qbiokfb9psnqnhtpj5g21fv0596jqria.apps.googleusercontent.com",
        clientSecret: "MwFeV_pSUyElH--qPP0mgEH9",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    twilio:{
         accountSid : 'ACfe6a2ee8edde53a9988f3e93478fbf4d',// Your Account SID from www.twilio.com/console
         authToken : '9ab5ca9a515efd92cd19b9aaf8c34553'
    },
    googleKey: 'AIzaSyClAnc__rQnEoH75Zs2sbWKj06tAYlSQus',
    jwt: {
        email: {
            secretKey: 'jsonEmailWebTokenTruckLoadsSecretKey',
            expiresIn: '15m'
        },
        password : {
            secretKey: 'jsonPasswordWebTokenTruckLoadsSecretKey',
            expiresIn: '15m'
        }
        
        
    }
}