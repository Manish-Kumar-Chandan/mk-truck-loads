const Chat = require('../models/chat');
const Messages = require('../models/messages')
const { validationResult } = require('express-validator/check');

exports.setupChat = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    if (req.session.user.role === 'Carrier') {
        return res.status(401).json({'error': 'UNAUTHORIZED', 'msg': 'Unauthorized you do not have permission to start chat'});
    }

    let shipper = req.session.user._id;
    let {carrier, job}= req.body;


    let isSetup = await Chat.find(
        { $and: [{ carrier: carrier }, { shipper:  shipper},{ job: job} ] },
    )


    let chat = new Promise ((resolve,reject) => {
        if (isSetup.length <= 0) {
            let chat = new Chat({
                carrier,
                shipper,
                job
            })
    
            chat
                .save()
                .then((chat) => {
                    resolve(chat);
                })
                .catch(err => {
                    resolve(null)
                })
        } else { 
            resolve(isSetup[0])
        }
    })
    
    if (chat) {
        chat.then(chat  => {
            return res.status(200).json({'msg': 'chat Setup Sucessfully!', chatId: chat._id})

        })
    } else {
        return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error occurs in setup chat!'})
    }
}


exports.getRestMessages = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {chatId, skip} = req.body;

        let user = req.session.user._id;
   
          Messages
          .find({chat: chatId})
          .sort([['createdAt', -1]])
          .skip(+skip)
          .limit(20)

          .then((messages) => {
                return res.status(200).json({'msg': 'messages fetch successfully!', data: messages})
          })
          .catch(err => {
                console.log(err)
                return res.status(500).json({'error': 'INTERNAL_SERVER' , 'msg': 'Error in fetching rest messages!'})
          })
    
}


