const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/posts.model")

postRouter.get("/", async (req, res)=>{
    const user = req.headers.user;
    try{
        const all_posts = await PostModel.find({user});
        res.send(all_posts)
    }catch(err){
        res.send(err.message)
    }
})
postRouter.get("/search", async (req, res)=>{
    const query = req.query;
    try{
        const all_posts = await PostModel.find(query);
        res.send(all_posts)
    }catch(err){
        res.send(err.message)
    }
})

postRouter.post("/add", async(req, res)=>{
    const content = req.body;
    try{
        let new_post = new PostModel(content);
        await new_post.save();
        res.send({"msg":"new post added"})
    }catch(err){
        res.send(err.message)
    }
})

postRouter.patch("/update/:id", async(req, res)=>{
    const ID = req.params.id
    const payload = req.body;
    try{
        await PostModel.findByIdAndUpdate(ID, payload);
        res.send({"msg":"post updated"})
    }catch(err){
        res.send(err.message)
    }

})
postRouter.delete("/delete/:id", async(req, res)=>{
    const ID = req.params.id
    try{
        await PostModel.findByIdAndDelete(ID);
        res.send({"msg":"post deleted"})
    }catch(err){
        res.send(err.message)
    }

})



module.exports = { postRouter }