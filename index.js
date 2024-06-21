import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import multer from "multer";

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file ,cb){
        cb(null,"./Components")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
})

const upload = multer({ storage: storage })

app.get("/",async(req,res) => {
    try{
        const { username , email, password, phonenumber} = req.body;
        const passwordb = await bcrypt.hash(password ,10);
        console.log("password", password);
        console.log("passwordb", passwordb);
        return res.status(200).json({data:"hello post"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({data:err. message})
    }
})
app.post("/Signup",async(req,res) => {
    try{
        console.log(req.body);
        res.json({data:"hello post"})
    }catch(err){
        console.log(err);
    }
})
app.post("/Signin",async(req,res) => {
    try{
        console.log(req.body);
        res.json({data:"kapil"})
    }catch(err){
        console.log(err);
    }
})
app.post("/Bookingform",
    upload.fields([{name:"HotelImage",maxCount:1}]),
    async(req,res) => {
    try{
        console.log(req.body);
        console.log("HotelImage =",req.files);
        res.status(200).json({ data: "hello form" })
    }catch(err){
        console.log(err);
    }
})
app.listen(8300)