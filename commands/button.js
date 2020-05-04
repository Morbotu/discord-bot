module.exports = message => {
    if (message.content.split().lenght > 2)
        return message.reply("This command only has one argument.");
    const colors = ["blue", "red"];
    for (const color in colors)
        if (!(message.guild.roles.cache.find(role => role.name === `${colors[color]} tier`)))
            message.guild.roles.create({
                data: {
                    name:  `${colors[color]} tier`,
                    color: `${colors[color].toUpperCase()}`,
                },
                reason: `button ${colors[color]} tier`,
            });
}