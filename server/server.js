const express = require('express');
const cors =require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi =require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json());




app.post('/login', (req, res) => {
   const code=req.body.code;
   const spotifyApi=new SpotifyWebApi({
       redirectUri: 'http://localhost:3000',
       clientId:'7d7f967aae8f4654b55e82c60f1c9442',
       clientSecret: '415d28b3905d4e6d8d1ff4399b6b813b',

   })

   spotifyApi.authorizationCodeGrant(code).then(data=>{
      
    res.json({
        accessToken : data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
    })
   

   })
   .catch(err=>{
       console.log(err);
   })
})

app.listen('3001',()=>{
    console.log("listening");
});