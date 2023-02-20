const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/users.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.get("/", async(req, res)=>{

    try{
       const all_users =  await UserModel.find();
       res.send(all_users)
    }catch(err){
        res.send(err.message)
    }
})

userRouter.post("/register", async(req, res)=>{
    const user = req.body;
    const email = user.email;
    const name = user.name;
    const pass = user.password;
    try{
        const users = await UserModel.find({email})
        if(users.length>0) res.send("User already exists, please login")
        else
        {
            bcrypt.hash(pass, 5, async(err, hash)=>{
                if(err) res.send("Problem in encrypting password")
                else
                {
                    user.password = hash;
                    const new_user = await new UserModel(user);
                    new_user.save();
                    res.send({"msg":`Dear ${name}, you are registered`}) 
                }
            });
        }
    }catch(err){
        res.send(err.message)
    }

})
userRouter.post("/login", async(req, res)=>{
    const {email,password} = req.body;
    try{
        const users = await UserModel.find({email})
        if(users.length>0)
        {
            bcrypt.compare(password, users[0].password, (err, result)=>{
                if(result)
                {
                    var token = jwt.sign({ ID: users[0]._id }, 'masai');

                    res.send({
                        "msg":`Welcome ${users[0].name}`,
                        "token":token
                    })
                }
                else res.send({
                    "msg":"Wrong Password",
                    "verified":false
                })
            });
        }
        else
        {
            res.send({"msg":`wrong credentials`})
        }
    }catch(err){
        res.send(err.message)
    }

})


module.exports = { userRouter };