const kick = require("../commands/kick");
const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
module.exports = (client, keyv, message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("!kick")) {
        return kick(message);
    }
    if (["hello","hallo","goedendag"].includes(message.content.toLowerCase())) {
        return sayHello(message);
    }
    if (message.content.startsWith("duel")) {
        return duel(keyv, message);
    }
}