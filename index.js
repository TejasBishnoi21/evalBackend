const express = require("express");
const app = express();
app.use(express.json()) // Middleware
require('dotenv').config()
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const { jwtVerifier } = require("./middlewares/jwt.verifier")

app.get("/", (req, res)=>{
    res.send('Welcome to Homepage')
})

app.use("/users", userRouter)
app.use(jwtVerifier)
app.use("/posts", postRouter)


app.listen(process.env.port, async(req, res)=>{
    try{
        await connection;
        console.log("connected to DB");
    }catch(err){
        console.log(err.message);
    }
    console.log(`server is running at port: ${process.env.port}`);
})