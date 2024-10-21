import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./routes/users.routes.js";
import gigRouter from "./routes/gig.routes.js";
import applicationRouter from "./routes/application.routes.js"
dotenv.config();
const app = express();



 // Use PORT from .env or default to 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
};
app.use(cors(corsOptions));
const port = process.env.PORT || 5000 ;

app.use("/api/v1/user",router)
app.use("/api/v1/gig",gigRouter);
app.use("/api/v1/application",applicationRouter);


app.listen(port,()=>
{
    connectDB();
    console.log(`Server runnig at port ${port}`)
}
);