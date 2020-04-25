module.exports = (message,fase) => {
    const opponent = message.mentions.members.first();
    const channel = message.channel;
    if (!opponent) {
        return message.reply(`Who are you trying to duel? You must mention a user.`)
    } else if (fase == 0) {
        fase++;
        return channel.send("<@" + opponent.user.id + ">" + " has 30 seconds to reply");
    }
}