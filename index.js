const express=require('express');
const mongoose = require('mongoose');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri=process.env.MONGO_URL;
mongoose.connect(uri,{useUnifiedTopology:true}).then(()=>{
    console.log("Connecting Mongo Database");
}).catch((err)=>{
    console.log(err);
});
mongoose.connection.once('open',()=>{
    console.log("Connected to mongoDB");
});

app.get('/',(req,res)=>{

});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
})