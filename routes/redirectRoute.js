const express = require('express');
const router = express().Router();
const Link = require('../models/link.model');

router.get('/:code',async (req,res)=>{
    const code= req.params.code;
    const link = await Link.findOne({shortUrl:code});
    if(link!=null){
        return res.redirect(link.longUrl);
    }
    else{
        return res.send('Invalid URL');
    }
});

module.exports = router;