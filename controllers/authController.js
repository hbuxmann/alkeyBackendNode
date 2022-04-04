const bcryptjs = require("bcryptjs");
let db = require("../database/models");
const jwt = require("jsonwebtoken");
const sendMail = require('../functions/sendMail');



const authController = {
    //
    login: async function(req, res){
        try{
            const { user, password } = req.body;
            //
            if(!(user && password)) {
                res.status(400).json({
                    success: false,
                    status_code: 400,
                    message: 'You must send all mandatory fields'
                })
            };
            //
            const userDb = await db.User.findOne({where: { user: user }});
            //
            if (!userDb) {
                res.status(401).json({
                    success: false,
                    status_code: 401,
                    message: 'Invalid credentials, please verify your user and/or email'
                })
            }
            //
            if (await bcryptjs.compareSync(password, userDb.password)){
                //
                console.log('TOKEN_KEY: '+process.env.TOKEN_KEY);
                // const token = jwt.sign({user: user}, 'secretKey', {expiresIn: "1h"});
                const token = jwt.sign({user: user}, process.env.TOKEN_KEY, {expiresIn: "1h"});
                res.status(200).json({
                    success: true,
                    status_code: 200,
                    message: 'Successful login',
                    token: token});

            } else {
                res.status(401).json({
                    success: false,
                    status_code: 401,
                    message: 'Invalid credentials, please verify your user and/or email'
                })
 
            }
        }
        catch(err){
            res.status(500).json({
                success: false,
                status_code: 500,
                message: err
            })

        }
    },
    register: async (req,res, next) =>  {

        let encryptedPass = req.body.password;

        if (encryptedPass.length > 0){
            encryptedPass = bcryptjs.hashSync(req.body.password, 10);
        }

        try {
            // 
            const user = await  db.User.create({            
                nickname: req.body.nickname,
                user: req.body.user,
                password: encryptedPass
            });
            //
            sendMail.send(req.body.user);
            //
            return res.status(201).json({
                success: true,
                status_code: 201,
                message: 'User registered!'         
            });
        } 
        catch(err) {
            return res.status(409).json({
                success: false,
                status_code: 409,
                message: err
            })            
        }
    },
};

module.exports = authController;