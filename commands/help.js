module.exports = (MessageEmbed, message) => {
    if (message.content.split(" ").length === 2) {
        const helpSubject = message.content.split(" ")[1]
        if (helpSubject === "duel")
            return message.channel.send(new MessageEmbed()
            .setTitle("Help page: duel")
            .setDescription("Usage:\n`R!duel @player`\nDescription:\nChallenge other players in a luck based duel.")
            .setColor(0xff0000)
        );
    }
    return message.channel.send(new MessageEmbed()
        .setTitle("Help page")
        .setDescription("Commands: \n`duel`")
        .setColor(0xff0000)
    );
}