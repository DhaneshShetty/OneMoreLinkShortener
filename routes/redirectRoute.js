const express = require('express');
const router = express.Router();
const Link = require('../models/link.model');

router.get('/:code',async (req,res)=>{
    const code= req.params.code;
    try{
        const link = await Link.findOne({'shortUrl':code});
        if(link!=null){
            return res.redirect(link.fullLink);
        }
        else{
            return res.send('Invalid URL');
        }
    } 
    catch(e){
        return res.status(500).json({'error':e});
    }
});

module.exports = router;