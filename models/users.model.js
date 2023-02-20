const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    gender:{type:String},
    password:{type:String},
    age:{type:Number},
    city:{type:String}
},{
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };


// {
//     "name":"vikram",
//     "email":"vikram@email.com",
//     "gender":"male",
//     "password":"vikram123",
//     "age":32,
//     "city":"mumbai"
// }