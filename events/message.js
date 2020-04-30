const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const getActiveRooms = require("../commands/getActiveRooms");
const help = require("../commands/help");
module.exports = (client, MessageEmbed, globalprefix, keyv, message) => {
    if (message.author.bot) return; // Doesn't awnser to bots.
    if (["hello","hallo","goedendag"].includes(message.content.toLowerCase()))
        return sayHello(message);
    if (["r!duel","yes","no","bite","punch","stab","mega_punch","hack"].includes(message.content.toLowerCase().split(" ")[0]))
        return duel(keyv, MessageEmbed, message, globalprefix);
    if (message.content.toLowerCase() === "get rooms")
        return getActiveRooms(keyv, message);
    if (message.content.toLowerCase().startsWith("r!help"))
        return help(MessageEmbed, message);
}