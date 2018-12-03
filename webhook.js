const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());

app.listen(process.env.PORT || 5000),() => {
    console.log("runnning port");
}
app.use(bodyParser.urlencoded({extended : false}));



app.get('/',function(req,res) {
    console.log('WEBHOOK_VERIFY');
    res.sendStatus(200);
});


app.get('/webhook',function(req,res){
    let VERIFY_TOKEN = 'texduo_cat';
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            console.log('WEBHOOK_VERIFY');
            res.status(200).send(challenge);
        }else{
            res.sendStatus(403).send('sorry!');
        }
    }
});

app.post('/webhook',function(req,res){
    let body = req.body;
    if (body.object === 'page'){
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send('EVENT_RECEIVED')
    }else{
        res.status(404).send("Sorry!");
    }
});

