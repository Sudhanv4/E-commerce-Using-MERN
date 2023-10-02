const express =require("express");
const app=express()

const userRoutes=require("./routes/user")
const paymentRoutes=require("./routes/Payments")
const productRoutes=require("./routes/Product");
const profileRoutes =require("./routes/profile")

const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"*",
        credentials:true 
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

cloudinaryConnect()
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/product",productRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/payment",paymentRoutes)

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log("App is running at ",PORT)
})