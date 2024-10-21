import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongo")

    }
    catch{
        console.error("Failed to connect to Mongo");
    }
}

export default connectDB;