const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const getActiveRooms = require("../commands/getActiveRooms");
module.exports = (client, MessageEmbed, keyv, message) => {
    if (message.author.bot) return; // Doesn't awnser to bots.
    if (["hello","hallo","goedendag"].includes(message.content.toLowerCase()))
        return sayHello(message);
    if (["duel","yes","no","bite","punch","stab","mega_punch"].includes(message.content.toLowerCase().split(" ")[0]))
        return duel(keyv, MessageEmbed, message);
    if (message.content.toLowerCase() === "get rooms")
        return getActiveRooms(keyv, message);
}