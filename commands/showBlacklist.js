module.exports = (message, blacklist, MessageEmbed) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You need to be administrator to see the blacklist.").catch(console.error);
    message.channel.send(
        new MessageEmbed()
            .setTitle("Blacklist")
            .setDescription(
                blacklist.join("\n")
            )
            .setColor(0xff0000)
    ).catch(console.error);
}