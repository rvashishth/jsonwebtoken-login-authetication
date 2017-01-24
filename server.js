'use strict';
const mongoose = require('mongoose');
const mongodbUriUtil = require('mongodb-uri');

const jsonwebtoken = require('jsonwebtoken');

const express = require('express');
const bodyParser = require('body-parser');
const morgon = require('morgan');
const cors = require('cors');
const os = require('os');

const config = require('./config');
const expressApp = express();
let UserModel = require('./app/models/user');

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended:false}));
expressApp.use(cors());
expressApp.use(morgon('dev'));

const port = process.env.PORT || 8080;
const host = os.hostname();
const dbOptions = {};
const mongodburi = mongodbUriUtil.formatMongoose(config.mlaburi);

const apiRoutes = express.Router();

apiRoutes.route('/user').post((request,response)=>{
	console.log("adding new user");
	const user = new UserModel(request.body);
	user.save((err,driver)=>{
		if(err){
			response.status(400).json(err);
		}
		response.json(user);
	});
});

apiRoutes.route('/user').get((request,response)=>{
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

apiRoutes.route('/authenticate').post((request,response)=>{
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
					token: jwttoken
				});
			}
		}
	});
});

expressApp.get('/',(req,res)=>{
	res.send(`Hello! you are at http://localhost:${port}/api`);
});

expressApp.use('/api',apiRoutes);

expressApp.listen(port,()=>{
	mongoose.connect(mongodburi,dbOptions,(err)=>{
		if(err)  {
			console.log("error connecting mongodb:"+err);
		}
		console.log(`Server is running at ${host}:${port}`);
	});
});





