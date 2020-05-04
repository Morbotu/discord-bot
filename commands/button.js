module.exports = async (message, keyv, MessageEmbed) => {
    if (message.content.split(" ").length > 2)
        return message.reply("This command only has one argument.");
    const arg = message.content.toLowerCase().split(" ")[1];
    const colors = ["blue", "red"];
    if (arg === "start") {
        for (const color in colors)
            if (!(message.guild.roles.cache.find(role => role.name === `${colors[color]} tier`)))
                message.guild.roles.create({
                    data: {
                        name:  `${colors[color]} tier`,
                        color: `${colors[color].toUpperCase()}`,
                    },
                    reason: `button ${colors[color]} tier`,
                });
        await keyv.set(message.guild.id + ":buttonAlive", true)
        await keyv.set(message.guild.id + ":button", colors.length-1);
        setInterval(async function() {
            if (await keyv.get(message.guild.id + ":buttonAlive")) {
                await keyv.set(message.guild.id + ":button", await keyv.get(message.guild.id + ":button") - 1);
                if ((await keyv.get(message.guild.id + ":button")) === 0)
                    await keyv.delete(message.guild.id + ":buttonAlive");
                    return message.channel.send(new MessageEmbed()
                        .setTitle("Button died")
                        .setDescription("Type `R!button start` to start the button again.")
                        .setColor(0xff0000)
                    );
            }
        }, 1000);
    }
    if (arg === "press") {

    }
    if (arg === "look") {
        
    }
}