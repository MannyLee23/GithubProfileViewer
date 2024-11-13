
const express = require('express');
const request = require('request');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


const clientID = 'Ov23liERDJ2r1uEBfRAT';
const clientSecret = 'af677611c7c72b669d7a71e55bb78c010ba8884d';

app.use(cookieParser());

app.get('/callback', (req, res) => {
    const code = req.query.code;
    const options = {
        url: `https://github.com/login/oauth/access_token`,
        method: 'POST',
        headers: {
            accept: 'application/json'
        },
        form: {
            client_id: clientID,
            client_secret: clientSecret,
            code: code
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error('Error fetching access token:', error);
            return res.status(500).send('Internal Server Error');
        }
    
        const accessToken = JSON.parse(body).access_token;
        console.log('Access Token:', accessToken); // Debugging line
    
        // Set the access token as a cookie
        res.cookie('auth_token', accessToken, { httpOnly: true, sameSite: 'None', secure: true });
        console.log('Cookie set'); // Debugging line
    
        // Log the response headers
        console.log('Response Headers:', res.getHeaders()); // Debugging line
    
        // Redirect to /profile
        res.redirect('/profile');
    });
});

app.get('/profile', (req, res) => {
    // Render the profile page or handle the profile route
    res.send('Profile Page');
});

app.listen(5173, () => {
    console.log('Server is running on http://localhost:5173');
});