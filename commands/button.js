module.exports = message => {
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