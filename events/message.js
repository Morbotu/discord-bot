const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const help = require("../commands/help");
const button = require("../commands/button");
const rombotFace = require("../commands/rombotFace");

module.exports = (message, client, MessageEmbed, globalPrefix, keyv) => {
    if (message.author.bot) return;

    if (["hello", "hallo", "goedendag"].includes(message.content.toLowerCase()))
        return sayHello(message);

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

    if (message.content.toLowerCase().startsWith(globalPrefix + "help"))
        return help(MessageEmbed, message);

    if (message.content.toLowerCase().startsWith(globalPrefix + "button"))
        return button(message, keyv, MessageEmbed);

    if (message.content.toLowerCase() === globalPrefix + "rombot") return rombotFace(message);
};
