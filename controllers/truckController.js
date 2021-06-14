var Truck = require('../models/truckInfo');
const aws = require('./awsController');
const awsController = require('./awsController');
const fs = require('fs');
const { response } = require('express');

/**
 * This function is use for get the list of truck information
 * @param {*} req 
 * @param {*} res 
 */
exports.getTruckInfo = async (req,res) =>{
    let truckInfo = await Truck.find({userId:req.session.user._id})
    res.render('Pages/truckInfo', {
        title: 'truck',
        data: truckInfo,
        user:req.session.user
  });
}

/**
 * This function use for save the truck information
 * @param {file, truckName, truckNumber} req 
 * @param {*} res 
 */
exports.saveTruck = async(req,res) =>{
  console.log("req",req.body);

  var file = req.file;
  // let fileContent = await fs.readFileSync(file.path);
  // let uploadedImage = await awsController.uploadAws('qoutesimages', file.filename, fileContent, file.mimetype);
  // await fs.unlinkSync(file.path, function(err,result){
  //   if(err){
  //     console.log("ok error",err)
  //     return res.status(401).json({'msg': 'some thing was wrong ', status: false});
  //   }else{
  //       console.log("ok result",result)
  //   }
  // })
  var truckData = new Truck({
    truckName:req.body.truckName,
    truckNumber:req.body.truckNumber,
    name: req.body.name,
    comment: req.body.comment,
    date: req.body.date,
    companyName: req.body.company,
    email: req.body.email,
    phone:req.body.phone,
    userId:req.session.user._id,
    truckImage: "https://image.shutterstock.com/image-photo/truck-driving-on-asphalt-road-260nw-1025490817.jpg"
  })
  truckData.save()
  .then((response)=>{
     return res.status(201).json({'msg': 'truck saved successfully!', status: true})
  }).catch((error) =>{
    return res.status(401).json({'msg': 'some thing was wrong ', status: false});
  })
}

/**
 * this function use get the information of truck
 */
exports.getTruckEditPage = async (req,res) => {
    let id = req.query.id;
    req.session.truckId = id;
    let truckInfo = await Truck.findOne({_id:id});
    res.render('Pages/editTruck', {
      title: 'editTruck',
      data: truckInfo
     
});
}

exports.editTruck = async(req,res) => {
  var file = req.file;
  var id = req.session.truckId;
  let fileContent = await fs.readFileSync(file.path);
  let uploadedImage = await awsController.uploadAws('qoutesimages', file.filename, fileContent, file.mimetype);
  await fs.unlinkSync(file.path, function(err,result){
    if(err){
      return res.status(401).json({'msg': 'some thing was wrong ', status: false});
    }else{
        console.log(result)
    }
  })
  await Truck.updateOne({_id:id},{
    truckName:req.body.truckName,
    truckNumber:req.body.truckNumber,
    truckImage: uploadedImage.Location
  }).then((response) =>{
     console.log('response',response);
     return res.status(201).json({'msg': 'truck updated  successfully!', status: true});
  }).catch((error) =>{
    return res.status(401).json({'msg': 'error in updating ', status: false});
  })
}


exports.getUser = (req,res) =>{
  try {
    return res.status(201).json({data:req.session.user, status: true});
  } catch (error) {
    
  }
}