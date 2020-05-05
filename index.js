/*
    27-04-2020
    This is a simple bot.
    In the index is some library magic going on.
    The rest is a bit of if statements giving some magic back.
*/

// Have rookout installed for debugging in prod. id: 0x0000
// -------------------------------------------------------------------------
const rookout = require('rookout');
rookout.start({
    token: '97c353b198a9dec0d4ac3f6f4d6c65d654cecda0d8118c82fc40f3d35f5d796a'
})
// -------------------------------------------------------------------------

// Some librarys. id: 0x0003
// ----------------------------------------------------
require("dotenv").config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require("fs");
// ----------------------------------------------------

// Memory setup. id: 0x0001
// -----------------------------------------------------------
const Keyv = require('keyv');
const keyv = new Keyv();
keyv.on('error', err => console.log('Connection Error', err));
// -----------------------------------------------------------

const globalprefix = "r!"; // Global prefix. id: 0x0002

// Get bot commands. id: 0x0004
// -------------------------------------------------------------------------------------------------------
fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, MessageEmbed, globalprefix, keyv, ...args));
    })
})
// -------------------------------------------------------------------------------------------------------

// client.login(process.env.BOT_TOKEN);
client.login("NzAzNTg4ODgzNjAxOTQ4NzQ0.XqQ6kQ.PKI0HoThZhL3USL7_vNv3HlosI8"); // Login bot client. id: 0x0005