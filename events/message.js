const kick = require("../commands/kick");
const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
module.exports = (client, keyv, message) => {
    if (message.author.bot) return; // Doesn't awnser to bots.
    if (message.content.startsWith("!kick"))
        return kick(message);
    if (["hello","hallo","goedendag"].includes(message.content.toLowerCase()))
        return sayHello(message);
    if (["duel","yes","stab","punch","bite","fly","no"].includes(message.content.toLowerCase().split(" ")[0]))
        return duel(keyv, message);
}