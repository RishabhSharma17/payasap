const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://rishabhsharma1782004:Rs%4017082004@cluster0.h52v3.mongodb.net/paytm');

if(db){
    console.log("Database Connected");
}

const userData = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4,
        trim:true,
    },
    firstname:{
        type:String,
        required:true,
        minLength:3,
        trim:true,
        lowercase:true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        lowercase:true,
    }
});

const accountschema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }
})

const User = mongoose.model("User",userData);
const Account = mongoose.model("Account",accountschema);

module.exports = {
    User,
    Account
};