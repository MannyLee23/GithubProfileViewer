var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = 'Ov23liERDJ2r1uEBfRAT';
const CLIENT_SECRET = 'af677611c7c72b669d7a71e55bb78c010ba8884d';


var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function(req, res) {
    console.log(req.query.code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

//Get user data
app.get('/getUserData', async function (req, res) {
    req.get('Authorization');
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

//Messaging Server

  app.listen(5175, () => {
    console.log('CORS is running on port 5175');
});

  
