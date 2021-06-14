const AWS = require('aws-sdk');
const AwsS3 = require('aws-sdk/clients/s3');
const config =  require('../config');
const nodemailer = require("nodemailer");

const creds = {
  accessKeyId: 'AKIAJMIIKCUWU56OONVQ',
  secretAccessKey: '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',
  region: 'ap-southeast-2',
}

const s3 = new AwsS3(creds);

AWS.config.update(creds);


exports.uploadAws =  function(bucket, filePath, fileContent, fileType) {

    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: filePath,
        Body: fileContent,
        ContentType: fileType,
        ACL: 'public-read'
      };
  
      s3.upload(params, (err, response) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(response)
        }
      })
    })
  }
  
exports.readAws = function(bucket, filePath) {
    return new Promise((resolve, reject) => {

        const params = {
            Bucket: bucket,
            Key: filePath,
        };


        s3.getObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log("Successfully dowloaded data from  bucket");
                resolve(data);
            }
        });
    });
}

exports.sendConfirmationMail =  function(token, host, email) {
    
  return new Promise((resolve, reject) => {
      link="http://"+host+"/verify-account?id="+token;
      mailOptions={
          from: '"dcube" <dcubedeveloper123@gmail.com>',
          subject: "Account Verification ✔",
          to : email,
          html : "Hello,<br> Please Click on the link to Activate Truck loads Account.<br>This link is valid for just 15 minutes. <br><a href="+link+">Click here</a>"
      }

      let transporter = nodemailer.createTransport({
          SES: new AWS.SES({
              apiVersion: '2010-12-01'
          }),
          sendingRate: 1
      });
      

      transporter.sendMail(mailOptions, function(error, response){
          if(error) {
              console.log(error)
              resolve(false)
          } else {
              resolve(true)   
          }
      })
  })
  
}


exports.forgetPasswordMail =  function(token, host, email) {
    
  return new Promise((resolve, reject) => {
      link="http://"+host+"/change-password?id="+token;
      mailOptions={
          from: '"dcube" <dcubedeveloper123@gmail.com>',
          to : email,
          subject : "Reset Password Truck Loads Account",
          html : "Hello,<br> Please Click on the link to  Reset Password.<br>This link is valid for just 15 minutes. <br><a href="+link+">Click here</a>"
      }

      let transporter = nodemailer.createTransport({
          SES: new AWS.SES({
              apiVersion: '2010-12-01'
          }),
          sendingRate: 1
      });
      

      transporter.sendMail(mailOptions, function(error, response){
          if(error) {
              console.log(error)
              resolve(false)
          } else {
              resolve(true)   
          }
      })
  })
  
}


exports.sendMail =  function(link, email, subject, html ) {
    
    return new Promise((resolve, reject) => {
        mailOptions={
            from: '"dcube" <dcubedeveloper123@gmail.com>',
            subject: subject,
            to : email,
            html : html 
        }
  
        let transporter = nodemailer.createTransport({
            SES: new AWS.SES({
                apiVersion: '2010-12-01'
            }),
            sendingRate: 1
        });
        
  
        transporter.sendMail(mailOptions, function(error, response){
            if(error) {
                console.log(error)
                resolve(false)
            } else {
                console.log(response)
                resolve(true)   
            }
        })
    })
    
  }
  
