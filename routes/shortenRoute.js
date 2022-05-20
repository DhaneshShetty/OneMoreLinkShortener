const express = require('express');
const router = express().Router();
require('dotenv').config();
const Link = require('../models/link.model');
const validUrl = require('valid-url');
const shortid = require('shortid');

const base=process.env.BASE;
router.post('/shorten',async (req,res)=>{
    const longUrl=req.body.longUrl;
    const custom=req.body.customUrl;
    if(!validUrl.isUri(longUrl)){
        return res.status(401).json({
            'error':'invalid URL'
        });
    }
    if(custom!=null){
        await Link.findOne({shortUrl:custom}).then(async (link)=>{
            if(link!=null){
                const newLink = new Link({longUrl:longUrl,shortUrl:custom});
                newLink.save();
                return res.status(200).json({'shortUrl':base+'/'+shortUrl});
            }
            else{
                return res.status(401).json({'error':'custom url already taken'});
            }
        }).catch((err)=>{
            return res.status(401).json({'error':err});
        });
    }
    else{
        const short = shortid.generate();
        const newLink = new Link({longUrl:longUrl,shortUrl:short});
        newLink.save();
        return res.status(200).json({'shortUrl':base+'/'+short});
    }
});

module.exports = router;