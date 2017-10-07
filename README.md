# jsonwebtoken-login-authetication

1. install all dependencies
>npm install

start mongo db
mongodb/bin>mongod --config C:\util\sdk_curr\mongodb\mongo.config

2. add mongod db uri
i.e. mongodb://localhost:27017/myproject

3. add user
http://localhost:8080/api/user

{
 "name": "chetan",
    "password": "password2",
    "email": "chetan@optum.com",
    "admin": true
}

3. authenticate, get json token
POST

Content-Type: application/json
Accepts: application/json

http://localhost:8080/authenticate
{
    "password": "password",
    "email": "rahul_vashishth@optum.com"
}
