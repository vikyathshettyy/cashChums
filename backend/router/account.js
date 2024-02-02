const express = require('express');
const {authMiddleware} = require('../middleware');
const { Account, Users } = require('../db/db');
const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async function(req,res) {

    try{
        const account = await Account.findOne({
            userId: req._id
        })

        res.json({
            balance: account.balance
        })
    }

    catch(e) {
        res.status(500).json({
            message: 'an error occured at the server'
        })
    }
    


})


accountRouter.post('/transfer', authMiddleware, async function(req,res) {
    const password = req.body.password;

    try{
        const fromAccount = await Account.findOne({
            userId: req._id,
            
        })

        const accountver = await Users.findOne({
            _id:req._id,
            password
        })

        if(!accountver){
            res.status(400).json({
                message: "Incorrect Password"
            })
            return;
        }
    
        if(fromAccount.balance < req.body.amount) {
            res.status(400).json({
                message: 'Insufficient balance'
            })
            return;
        }

        const toAccount = await Account.findOne({
            userId: req.body.to
        })

        if(!toAccount) {
            res.status(400).json({
                message: `Recipient account doesn't exist` 
            })
            return;
        }
        

        //transaction started

        const session = await Account.startSession();
        session.startTransaction();
        await Account.updateOne({
            userId: req._id
        },{$inc: {balance: -(req.body.amount)}}).session(session);

        await Account.updateOne({
            userId: req.body.to
        },{$inc: {balance: req.body.amount}}).session(session);

        await session.commitTransaction();

        session.endSession();
        res.json({
            message: 'Transfer successfull'
        })
        return;
        
    }
    catch(e) {
        res.status(500).json({
            message: 'An error occured'
        })
        console.log(e);
    }
    
})



module.exports = {
    accountRouter
}