'use strict';

const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config');

router.use((req,res,next)=>{
	let token = req.get('Authorization');
	console.log('Authorization router========token:'+config.secret);
	if(token){
		jsonwebtoken.verify(token,config.secret,(err,decoded)=>{
			console.log("decoded:"+decoded);
			if(err){
				res.status(404).json({success:false,message:"Failed  to authenticate token"});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}else{
		return res.status(403).send({ 
        	success: false, 
        	message: 'No token provided.' 
    	});
	}
});

module.exports = router;