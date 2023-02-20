const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{type:String},
    body:{type:String},
    device:{type:String},
    no_of_comments:{type:Number},
    user:{type:String}
},{
    versionKey:false
})

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };


// {
//     "title":"long drive",
//     "body":"my trip to lonavala",
//     "device":"laptop",
//     "no_of_comments":1200,
//     "user":"001"
// }

