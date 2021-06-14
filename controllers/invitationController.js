const Invitation = require('../models/invitation');

/***
 * This function are use for add invitation send by shipper to carrier 
 */
exports.addInvitationShipper = async (req,res) =>{
    const {item ,shipperId , shippedDate, pickupAddress, DeliveryAddress, carrierId } = req.body
    const invitation = new Invitation({
        item:item,
        shipperId:shipperId,
        shippedDate:shippedDate,
        pickupAddress:pickupAddress,
        DeliveryAddress: DeliveryAddress,
        carrierId:carrierId
    })
    invitation.save()
    .then((response)=>{
        res.status(200).send({'status':true,'msg':'add invitation '} )
    }).catch((error)=>{
        res.status(400).send({'status':false,'msg':'some error '} )
    })
}

/**
 * This function use get all invitation 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllInvitation =  (req,res) =>{
     Invitation.find({carrierId:req.session.user._id,cancellation:false})
    .populate('shipperId')
    .then((invitationData) =>{
        res.render('Pages/invitation', {
            title: 'invitation',
            data: invitationData
      });
    }).catch((error)=>{
        console.log('some thing wrong')
    })
}

/**
 * This function use for get all cancellation list
 * @param {*} req 
 * @param {*} res 
 */
exports.getCancellation = async(req,res) =>{
    await Invitation.find({carrierId:req.session.user._id,cancellation:true})
    .populate('shipperId')
    .then((cancellationData) =>{
        res.render('Pages/cancellation', {
            title: 'invitation',
            data: cancellationData
      });
    // res.status(200).json({data:cancellationData})
    })
}

/**cancelInvitation
 * This function accept invitation 
 * @param {id} req // this is id for invitation
 * @param {*} res 
 */
exports.acceptInvitation = async(req,res) =>{
    await Invitation.update({_id:req.query.id},{status:true})
    .then((result) =>{
        console.log(result);
        Invitation.find({ carrierId: req.session.user._id, cancellation: false })
            .populate('shipperId')
            .then((invitationData) => {
                res.render('Pages/invitation', {
                    title: 'invitation',
                    data: invitationData
                });
            }).catch((error) => {
                console.log('some thing wrong')
            })
    })
}

exports.cancelInvitation = async(req,res) =>{
    await Invitation.update({_id:req.query.id},{cancellation:true})
    .then((result) =>{
        console.log(result);
        Invitation.find({ carrierId: req.session.user._id, cancellation: false })
            .populate('shipperId')
            .then((invitationData) => {
                res.render('Pages/invitation', {
                    title: 'invitation',
                    data: invitationData
                });
            }).catch((error) => {
                console.log('some thing wrong')
            })
    })    
}
