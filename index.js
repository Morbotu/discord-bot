require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Keyv = require('keyv');
const keyv = new Keyv();
keyv.on('error', err => console.log('Connection Error', err));

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventHandler(client, keyv, ...args))
    })
})

client.login(process.env.BOT_TOKEN);