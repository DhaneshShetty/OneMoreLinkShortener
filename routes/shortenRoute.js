const express = require('express');
const router = express.Router();
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
        try{
            const link=await Link.findOne({shortUrl:custom});
            if(link==null){
                const newLink = new Link({fullLink:longUrl,shortUrl:custom});
                const finalLink = base+'/'+custom;
                try{
                    await newLink.save();
                    return res.status(200).json({'shortUrl':finalLink});
                }
                catch(e){
                    return res.status(401).json({'error':e});
                };            
            }
            else{
                return res.status(401).json({'error':'custom url already taken'});
            }
        }
        catch(err){
            console.log(err);
        }        
    }
    else{
        const short = shortid.generate();
        const newLink = new Link({fullLink:longUrl,shortUrl:short});
        try{
            await newLink.save();
            return res.status(200).json({'shortUrl':base+'/'+short});
        }
        catch(e){
            return res.status(401).json({'error':e});
        };        
    }
});

module.exports = router;