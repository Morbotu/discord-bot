const sayHello = require("../commands/sayHello");
const duel = require("../commands/duel");
const help = require("../commands/help");
const button = require("../commands/button");
const rombotFace = require("../commands/rombotFace");
const saySomething = require("../commands/saySomething");
const playMedia = require("../commands/playMedia");
const stopAudio = require("../commands/stopAudio");

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
    
    if (message.content.toLowerCase().startsWith(globalPrefix + "say"))
        return saySomething(message);
    
    if (message.content.toLowerCase().startsWith(globalPrefix + "play"))
        return playMedia(message);

    if (message.content.toLowerCase().startsWith(globalPrefix + "stop"))
        return stopAudio(message, client);

    if (message.content.toLowerCase() === globalPrefix + "rombot") return rombotFace(message);
};
