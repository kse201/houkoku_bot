'use strict'

const express = require('express')
const line = require('@line/bot-sdk')
const PORT = process.env.PORT || 3000

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.LINE_SECRET
}

const app = express()

const client = new line.Client(config)

function handleEvent (event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null)
    }

    let patterms= [
        'すごい',
        'えらい',
        'いいね'
    ]
    let max = patterms.length
    msg =  patterms[Math.floor( Math.random() * (max + 1) )]

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: msg
    })
}

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events)
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
})


app.listen(PORT)
console.log(`Server running at ${PORT}`)
