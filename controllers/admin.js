const config = require('../config');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

exports.addAdmin = (req,res,next) => {
    

    let password = 'Admin@123'

    User
        .findOne({email: 'info@srktransport.au'})
        .then((user) => {

            if (user) {
                return res.status(401).json({'error': 'Admin already exists'})
            }

            bcrypt
            .hash(password, 12)
            .then( async (hashedPassword) => {
                let user;
                    user = await new User({
                        'username': 'srk',
                        'firstName': 'SRK', 
                        'lastName': 'Admin', 
                        'email': 'info@srktransport.au', 
                        'password':hashedPassword,  
                        'phone': '1234567890', 
                        'address': '-', 
                        'type': 'Admin', 
                        'activated': true,
                        'role': 'ADMIN'})
    
                
                return user.save();
            })
            .then((user) => {
                return res.status(200).json({'msg': 'Admin Registered', status: true})
            })
            .catch(err => {
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error', status: false})
            })
        })
        .catch((err) => {

        })
    
}


exports.loginAdmin = (req,res,next) => {
    const {email , password, remember} = req.body;

    User
        .findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "Admin Not Exits", status: false})
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {

                    if(!doMatch) {
                        return res.status(401).json({"error": "INVALID_PASSWORD", "msg": "Password not Mached", status: false})
                    }

                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    if (remember === 'false') {
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
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Login User!', status: false});
        })

}