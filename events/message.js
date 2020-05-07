const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const getActiveRooms = require("../commands/getActiveRooms");
const help = require("../commands/help");
const button = require("../commands/button");

module.exports = (client, MessageEmbed, globalPrefix, keyv, message) => {
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

    // TODO: This function isn't necessary for the final version.
    if (message.content.toLowerCase() === "get rooms") return getActiveRooms(keyv, message);

    if (message.content.toLowerCase().startsWith(globalPrefix + "help"))
        return help(MessageEmbed, message);

    if (message.content.toLowerCase().startsWith(globalPrefix + "button"))
        return button(message, keyv, MessageEmbed);
};
