const kick = require("../commands/kick");
const sayHello = require("../commands/sayHello");
module.exports = (client, message) => {
    if (message.content.startsWith("!kick")) {
        return kick(message);
    }
    if (lower(message.content) == "hello") {
        return sayHello(message);
    }
}