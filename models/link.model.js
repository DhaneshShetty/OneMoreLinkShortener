const mongoose=require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema();

const linkSchema = new Schema({
    fullLink:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true,
        default:shortid.generate()
    },
    opens:{
        type:Number,
        required:true.valueOf,
        default:0
    }
});

const Link = mongoose.model('Link',linkSchema);
module.exports = Link;