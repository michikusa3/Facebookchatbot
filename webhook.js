const request = require('request');
const express = require('express');
const bodyPaser = require('body-parser');
const app = express();

app.set('port',(process.env.PORT || 5000));

app.use(bodyPaser.urlencoded({extended : false}));
app.use(bodyPaser.json());

app.get('/',(res,req) => {
    res.send('Hi I am a chatbot');
})

app.get('/webhook/',(res,req) => {
    if(req.query('hub.verify_token') === "texduo_cat"){
        res.send(req.query('hub.challege'));
    }
    else{
        res.send('Wrong token');
    }
})

app.listen(app.get('port'),function(){
    console.log("runnning port");
})