/*
    27-04-2020
    This is a simple bot.
    In the index is some library magic going on.
    The rest is a bit of if statements giving some magic back.
*/
require("dotenv").config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require("fs");
const Keyv = require('keyv');
const keyv = new Keyv();
keyv.on('error', err => console.log('Connection Error', err));

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, MessageEmbed, keyv, ...args));
    })
})

client.login(process.env.BOT_TOKEN);