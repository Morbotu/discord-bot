module.exports = async (keyv, message) => {
    const opponent = message.mentions.members.first();
    const channel = message.channel;
    if (!opponent) return message.reply(`Who are you trying to duel? You must mention a user.`);
    else if (!(await keyv.get("duel " + message.author.id))) {
        await keyv.set("duel " + message.author.id, true);
        return channel.send("<@" + opponent.user.id + ">" + " has 30 seconds to reply");
    }
    else keyv.clear();
}