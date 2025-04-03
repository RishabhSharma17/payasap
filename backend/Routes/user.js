const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const {Authenticate} = require('../MiddleWare/middleware');
const {User,Account} = require('../Db/db');
const {jwt_password} = require('../config');
const Router = express.Router();


const signupschema = zod.object({
    username: zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string(),
});

Router.post('/signup',async (req,res)=>{
    const body = req.body;
    const  validation = signupschema.safeParse(body);
    if(!validation.success){
        res.json({
            error:"Invalid Inputs",
        });
    }
    else{
        const olduser = await User.findOne({
            username:body.username,
        });

        if(olduser){
            return res.json({
                error:"Username already taken",
            });
        }

        const user = await User.create({
            username:body.username,
            firstname:body.firstname,
            lastname:body.lastname,
            password:body.password,
        });

        const id = user._id;
        await Account.create({
            userid:id,
            balance:1+Math.random()*10000,
        })

        const token = jwt.sign({id},jwt_password);
        res.json({
            msg:"User created successfully!",
            token:token,
        })
    }
});

const signinschema = zod.object({
    username:zod.string(),
    password:zod.string(),
});
Router.post('/signin',async (req,res)=>{    
    const {success} = signinschema.safeParse(req.body);
    if(!success){
        res.json({
            msg:"Wrong Inputs!",
        });
    }
    else{
        const user = await User.findOne({
            username:req.body.username,
        });

        if(!user){
            return res.status(400).json({
                msg:"User does'nt exist!",
            });
        }

        if(req.body.password===user.password){
            const id = user._id;
            const token = jwt.sign({id},jwt_password);
            res.json({
                msg:"Logged in successfully!",
                token:token, 
            });
        }
        else{
            return res.status(404).json({
                msg:"Wrong Password!",
            });
        }        
    }
});

const updateBody = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
});

Router.put('/changeuserinfo',Authenticate,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.json({
            error:"Invalid Inputs",
        });
    }
    else{
        await User.updateOne(req.body,{
            id:req.id,  
        });

        res.json({
            msg:"Update Successfully!",
        })
    }
});

Router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        "$or":[{
            firstname:{
                "$regex":filter,
            }
        },{
            lastname:{
                "$regex":filter,
            }
        }],
    });

    res.json({
        user:users.map(users => ({
            id:users._id,
            firstname:users.firstname,
            lastname:users.lastname,
            username:users.username,
        })),
    });
})

module.exports = Router;