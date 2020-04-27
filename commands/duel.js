module.exports = async (keyv, MessageEmbed, message) => {
    const channel = message.channel;
    if (message.content.toLowerCase().startsWith("duel")) {
        if (await keyv.get(message.author.id + "=occupied"))
            return channel.send("You are already in a fight or you need to awnser a request.");
        const opponent = message.mentions.members.first();
        if (!opponent) 
            return channel.send("Mention the player you want to challenge.");
        if (await keyv.get(opponent.user.id + "=occupied")) 
            return channel.send("This player is already in a fight or still needs to awnser a request.");
    }
}