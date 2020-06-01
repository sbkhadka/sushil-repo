var Express = require('express')
var request = require('request')


const app = new Express()

//auths
const slackToken = "xoxb-999078193719-1020472204144-bIqzgAp7ACtaiHbEsI5Nv2gq"
const PORT="3020"
const CLIENT_ID = "999078193719.1010384045377"
const CLIENT_SECRET = "5109f99488ccfe98e9d778ddfdb2ee2c"
const REDIRECT_URI = 

//on GET
//app.get('/', (req,res) => res.json("Message Received"))

//on POST from slack
app.post('/', (req,res) => {
    return res.json("Message Received")

    /*var request = require('request');
    request('https://slack.com/oauth/authorize', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
        }
    })*/

})

app.get('/auth', (req, res) =>{
    res.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect/success', (req, res) => {
    res.sendFile(__dirname + '/success.html')
})

app.get('/auth/redirect', (req, res) =>{


    //Note: If you initiate an install with the v2/authorize URL, it must be completed 
    //with oauth.v2.access, not the old oauth.access method.
    console.log(req.query.code)
    var options = {
        uri: 'https://slack.com/api/oauth.v2.access?code='
            +req.query.code+
            '&client_id='+CLIENT_ID+
            '&client_secret='+CLIENT_SECRET /*+
            '&redirect_uri='+'https://slackherumla.ngrok.io/auth/redirect/success', //REDIRECT_URI*/,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server started listening at localhost:${PORT}`)
})


