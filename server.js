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
expressApp.use(bodyParser.urlencoded({extended:true}));
expressApp.use(cors());
expressApp.use(morgon('dev'));

const port = process.env.PORT || 8080;
const host = os.hostname();
const dbOptions = {};
const mongodburi = mongodbUriUtil.formatMongoose(config.mlaburi);



expressApp.use('/api',require('./app/route/middleware'));
expressApp.use('/api/user',require('./app/route/user'));
expressApp.use('/authenticate',require('./app/route/auth'));

expressApp.listen(port,()=>{
	mongoose.connect(mongodburi,dbOptions,(err)=>{
		if(err)  {
			console.log("error connecting mongodb:"+err);
		}
		console.log(`Server is running at ${host}:${port}`);
	});
});





