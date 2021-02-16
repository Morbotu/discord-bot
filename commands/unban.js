const fs = require("fs");

module.exports = (message, blacklist) => {
    if (message.mentions.members.array().length === 0) return message.reply("You need to specify who you want to ban.").catch(console.error);
    if (message.mentions.members.array().includes(message.member)) return message.reply("You can't unban yourself.").catch(console.error);
    if (message.member.hasPermission("ADMINISTRATOR")) {
        for (let i of message.mentions.members.array()) if (blacklist.includes(i.user.tag)) blacklist.splice(blacklist.indexOf(i.user.tag), 1);
        fs.writeFile("./blacklist", blacklist.join("\n"), (err) => {if (err) console.log(err)});
    } else return message.reply("You need to be administrator to use this command.").catch(console.error);
}