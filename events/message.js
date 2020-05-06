/* -------------------- ANCHOR Import all command files. -------------------- */
const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const getActiveRooms = require("../commands/getActiveRooms");
const help = require("../commands/help");
const button = require("../commands/button");
/* -------------------------------------------------------------------------- */

/* ------------------------ SECTION Code of module. ----------------------- */
module.exports = (client, MessageEmbed, globalPrefix, keyv, message) => {
    if (message.author.bot) return; // NOTE Makes sure the bot doesn't answer other bots.

    /* ----------------------- ANCHOR Bot says hello back. ---------------------- */
    if (["hello", "hallo", "goedendag"].includes(message.content.toLowerCase()))
        return sayHello(message);
    /* -------------------------------------------------------------------------- */

    /* --------------------- ANCHOR Bot calls duel function. -------------------- */
    if (
        [
            globalPrefix + "duel",
            "yes",
            "no",
            "bite",
            "punch",
            "stab",
            "mega_punch",
            "hack",
        ].includes(message.content.toLowerCase().split(" ")[0])
    )
        return duel(keyv, MessageEmbed, message, globalPrefix);
    /* -------------------------------------------------------------------------- */

    /* --------------- ANCHOR Bot send all active room from duels. -------------- */
    if (message.content.toLowerCase() === "get rooms") return getActiveRooms(keyv, message);
    /* -------------------------------------------------------------------------- */

    /* -------------- ANCHOR Bot sends a message with all commands. ------------- */
    if (message.content.toLowerCase().startsWith(globalPrefix + "help"))
        return help(MessageEmbed, message);
    /* -------------------------------------------------------------------------- */

    /* -------------------- ANCHOR Bot calls button function. ------------------- */
    if (message.content.toLowerCase().startsWith(globalPrefix + "button"))
        return button(message, keyv, MessageEmbed);
    /* -------------------------------------------------------------------------- */
};
/* -------------------------------- !SECTION -------------------------------- */
