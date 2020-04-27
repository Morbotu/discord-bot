module.exports = async (keyv, message) => {
    const channel = message.channel;
    if (message.content.toLowerCase() === "yes" && await keyv.get("duel " + message.author.id)) {
        await keyv.delete("duel " + message.author.id);
        return channel.send("<@" + message.author.id + "> " + "accepted");
    }
    if (message.content.toLowerCase().split(" ")[0] === "duel" && await keyv.get("dueling " + message.author.id)) 
        return channel.send("You are already in a duel!");
    else if (message.content.toLowerCase().split(" ")[0] === "duel") {
        const opponent = message.mentions.members.first();
        if (!opponent) return message.reply(`Who are you trying to duel? You must mention a user.`);
        await keyv.set("dueling " + message.author.id, true);
        await keyv.set("duel " + opponent.user.id, true);
        setTimeout(async function() {
            if (await keyv.get("duel " + opponent.user.id)) {
                await keyv.delete("duel " + opponent.user.id);
                await keyv.delete("dueling " + message.author.id);
                return channel.send("duel expired");
            }
        }, 10000);
        return channel.send("<@" + opponent.user.id + ">" + " has 30 seconds to reply");
    }
    if (message.content.toLowerCase() === "no" && await keyv.get("duel " + message.author.id)) {
        await keyv.delete("duel " + message.author.id);
        return channel.send("<@" + message.author.id + "> " + "refused");
    }
}