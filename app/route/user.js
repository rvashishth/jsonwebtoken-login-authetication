'use strict';

const express = require('express');
const UserModel = require('../models/user');

let userRouter = express.Router();

userRouter.route('/').post((request,response)=>{
	console.log("adding new user");
	const user = new UserModel(request.body);
	user.save((err,driver)=>{
		if(err){
			response.status(400).json(err);
		}
		response.json(user);
	});
});

userRouter.route('/').get((request,response)=>{
	console.log("getting all users")
	UserModel.find({},(err,users)=>{
		if(err){
			response.status(404).json(err);
		}
		if(!users){
			console.log(`returning users `);
			response.status(404).json({message:`no users are in system`});
		}else{
			response.json(users);
		}
	});
});

module.exports = userRouter;