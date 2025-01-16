const express = require('express');
const mongoose = require('mongoose');
const {Account,User} = require('../Db/db');
const {Authenticate} = require('../MiddleWare/middleware');
const Router = express.Router();

Router.get('/balance',Authenticate,async (req,res)=>{
    const account = await Account.findOne({userid:req.id});
    if(!account){
        return res.status(404).json({
            msg:"Account not found",
        });      
    }
    res.json({
        balance:account.balance,
    });
});


/*
Router.post('/transfer',Authenticate,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;

    console.log(req.id);
    const from = await Account.findOne({
        userid:req.id,
    }).session(session);

    console.log(from);
    if(!from || from.balance < amount){
        await session.abortTransaction();
        return res.status(404).json({
            msg:"Insufficient balance",
        });
    }

    const toaccount = await User.findOne({
        username:to,
    });

    if(!toaccount){
        await session.abortTransaction();
        return res.status(404).json({
            msg:"Reciever not found",
        });
    }

    const toid = toaccount._id;

    await Account.updateOne({
        id:req.id,
    },{
        "$inc":{
            balance:-amount,
        }
    }).session(session);

    await Account.findByIdAndUpdate({
        id:toid,
    },{
        "$inc":{
            balance:amount,
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        msg:"Transaction Successful!",
    });
});
 */
Router.post('/transfer', Authenticate, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { amount, to } = req.body;
        const from = await Account.findOne({ userid: req.id }).session(session);
        
        if (!from || from.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ msg: "Insufficient balance" });
        }

        const toAccount = await User.findOne({ _id: to });
        
        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ msg: "Receiver not found" });
        }

        const toId = toAccount._id;

        await Account.updateOne(
            { userid: req.id },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userid: toId },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        res.json({ msg: "Transaction Successful!" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Transaction error:', error);
        res.status(500).json({ msg: "Transaction failed" });
    }
});

module.exports = Router;