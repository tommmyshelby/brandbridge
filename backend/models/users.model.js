import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    phoneNumber:{   
        type: Number,
        required: true,
    },
    password:{
        type:String,
        required: true

    },
    role:{
        type:String,
        required: true,
        enum:['brand', 'influencer']
    },
    profile: { type: Boolean, default: false }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);