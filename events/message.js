// Import all command files. id: 0x0000
// ---------------------------------------------------------
const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const getActiveRooms = require("../commands/getActiveRooms");
const help = require("../commands/help");
const button = require("../commands/button");
// ---------------------------------------------------------

module.exports = (client, MessageEmbed, globalprefix, keyv, message) => {
    if (message.author.bot) return; // Makes sure the bot doesn't awnser other bots. id: 0x0001 

    // Bot says hello back. id: 0x0002
    // -----------------------------------------------------------------------
    if (["hello","hallo","goedendag"].includes(message.content.toLowerCase()))
        return sayHello(message);
    // -----------------------------------------------------------------------
    
    // Bot calls duel. id: 0x0003
    // -----------------------------------------------------------------------------------------------------------------------
    if (["r!duel","yes","no","bite","punch","stab","mega_punch","hack"].includes(message.content.toLowerCase().split(" ")[0]))
        return duel(keyv, MessageEmbed, message, globalprefix);
    // -----------------------------------------------------------------------------------------------------------------------
    
    // Bot send all active room for duels. id: 0x0004
    // -----------------------------------------------
    if (message.content.toLowerCase() === "get rooms")
        return getActiveRooms(keyv, message);
    // -----------------------------------------------

    // Bot sends a message with all commands. id: 0x0005
    // ----------------------------------------------------
    if (message.content.toLowerCase().startsWith("r!help"))
        return help(MessageEmbed, message);
    // ----------------------------------------------------

    // Bot calls button. id: 0x0006
    // ------------------------------------------------------
    if (message.content.toLowerCase().startsWith("r!button"))
        return button(message, keyv, MessageEmbed);
    // ------------------------------------------------------
}