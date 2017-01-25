'use strict';

const express = require('express');
const UserModel = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config');
let router =  express.Router();

router.route('/').post((request,response)=>{
	UserModel.findOne({
		email: request.body.email
	}, (err,user)=>{
		if(err){
			response.status(400).json(err);
		}
		if(!user){
			response.status(404).json({message:`user not found`});
		}else{
			if(user.password != request.body.password){
				response.status(404).json({success:false, message :`authentication failed, wrong password`});
			}else{
				let userJwtData = {
					email:request.body.email
				};
				let jwttoken = jsonwebtoken.sign(userJwtData,config.secret,{
					expiresIn:60*30
				});
				response.json({
					success:true,
					message: `user is real`,
					token: jwttoken,
					User : {}
				});
			}
		}
	});
});

module.exports = router;