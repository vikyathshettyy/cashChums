const express = require('express');
const zod = require('zod');
const { Users, Account } = require('../db/db');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const {authMiddleware} = require('../middleware');
const { User } = require('../../../week-3-midware-jwt-mongo/week-3/03-mongo/db');

const userRouter = express.Router();
const userBodySchema = zod.object({
    username: zod.string().email({message: "Invalid email address"}),
    password: zod.string().min(6,{message: "Password must be atleast 6 characters long"}),
    firstName: zod.string(),
    lastName: zod.string(),
})

const updateUserSchema = userBodySchema.omit({username: true}).partial();


const signinBodySchema = zod.object({
    username: zod.string().email({message: "Invalid email addresss"}),
    password: zod.string().min(6,{message: "Password must be atleast 6 characters long"})
})


userRouter.post('/signup', async function(req,res){
    const found = await Users.findOne({username: req.body.username});
    if(found) {
        res.status(400).json({message: "User already exists!"});
        return;
    } 
    else{
        try{
            userBodySchema.parse(req.body);
        }
        catch(e){
            res.status(400).json({message: e.message});
            return;
        }

        try{
            const user = await Users.create(req.body);
            
            const token = jwt.sign(user._id.toString(), JWT_SECRET);
            

            //initializing balance of the signed up user to a random amount
            await Account.create({
                userId: user._id,
                balance: 1 + Math.random()*100000

            })

            res.status(200).json({message: "user created successfully", token: token});


        }
        catch(e){
            res.status(500).json({message: "an error occured at the server"});
            console.log(e);

        }
        

    }
    
})

userRouter.post('/signin', async function(req,res){
    try{
        const {success, error} = signinBodySchema.safeParse(req.body);
        if(!success) {
            res.status(400).json({message: error.message});
            return;
        }
        const user = await Users.findOne({username: req.body.username, password: req.body.password });
        if(!user){
            res.status(400).json({message: `User doesn't exist/incorrect password`});
            return;

        }
        else{
            
            const token = jwt.sign(user._id.toString(),JWT_SECRET);
            res.status(200).json({
                message: "Successfully logged in",
                token: token,
            })
        }
    }
    catch(e) {
        res.status(500).json({
            message: "an error occured at the server",
            
        })
        console.log(e);
    }

})

userRouter.put('/',authMiddleware,async function(req,res) {
    
    
    const {success} = updateUserSchema.safeParse(req.body);
    
    

    if(!success) {
        res.status(400).json({
            message: "invalid inputs"
        })
        return;
    }
    try{
        
        await Users.updateOne({_id: req._id}, req.body);
        res.json({message: "Updated successfully"});

        
    }
    catch(e) {
        res.status(411).json({message:"error while updating information"});
        console.log(e);
    }
})

userRouter.get('/', authMiddleware, async function(req,res) {
    const user = await Users.findOne({
        _id: req._id,
    })

    res.json({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
    })
})

userRouter.get('/id',authMiddleware,async function(req,res) {
    console.log(req.query.id);

    
    const user = await Users.findOne({
        _id: req.query.id,
    })

    res.json({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
    })

})

userRouter.get('/bulk', authMiddleware, async function(req,res) {
    const filter = req.query.filter;

    try{
        const rgx = (pattern) => new RegExp(`${pattern}.*`);
        const searchRgx = rgx(filter);


        const result = await Users.find(
            {$or: [{firstName: { $regex: searchRgx, $options: "i" }},{lastName: { $regex: searchRgx, $options: "i" }}]}
            

        )
        
        
        res.json({
            users: result.map(user=> {
                const newobj = {};
                newobj._id = user._id,
                newobj.username = user.username;
                newobj.firstName = user.firstName;
                newobj.lastName = user.lastName;
                return newobj;
                
            })
        });
    }
    catch(e) {
        res.status(500).json({
            message: "internal server error"
        })
        console.log(e);
    }
    

})


module.exports = {
    userRouter
}
