# We Sport --Backend

Author: xiaofeng gong

## Features.

 + error handling - errorNotification (notifier)
 + upload - user can upload a file(size limited to 1.6MB) and the backend can store and read file.(based on multer) 
 + logging - record requests and save in local storage based on morgan
 + mail - the express can send email to user's email address for retrieving password when authenticating.(based on nodemailer) 
 + xoauth2 - a way to authenticate
 + Helmet - encrypt the request headers
 + Moment - manipulate date and time
 + HTTPS - use a private key to encrypt all the requests
 + tests - based on mocha
 + encryption - using MD5 encryption to encrypt data like password in database
 + socketIO - creating a distributed server that provides a tunnel for user's communication.
 + Distance algorithm - implemented by mongoDB $near function, only response eligible entries.
 + 

## Installation Requirements

download:

```bat
git clone https://github.com/copyninnja/WE_back.git
```

followed by installation:

```bat
npm install
npm run build
npm start
```

## API Configuration

creating an ``.env`` and what variables to put in it. 

```bat
NODE_ENV=development
PORT=yourPort
HOST=localhost
MONGO_DB=YourMongoURL
SEED_DB=true
secret=YourJWTSecret
TMDB_KEY=key
TOKEN=1
MailPassword=yourEmailaccessToken
```


## API Design

- chat 
- nearby
- products
- upload
- users

## Security and Authentication

The authentication is implemented by cookie and verified by MD5 encryption

All the api/public are protected, user cannot access the public resources. Only authorized user can access all the services.



## Error/Exception Testing.

+ POST /api/users/register - test register a new user without password, invalid password.See tests\functional\api\users\index.js
+ POST /api/users - test when authenticating with mismatch username, mismatch password  .See tests\functional\api\users\index.js