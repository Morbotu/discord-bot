module.exports = async (message, keyv, MessageEmbed) => {
    if (message.content.split(" ").length > 2)
        return message.reply("This command only has one argument.");

    const arg = message.content.toLowerCase().split(" ")[1];
    // Change button Colors for more colors.
    const buttonColors = ["blue", "red", "green"];
    const channel = message.channel;
    const guild = message.guild;

    if (arg === "start") {
        const check = [];
        for (const color of buttonColors) check.push(`${color} tier`);
        const roles = guild.roles.cache.filter((role) => !check.includes(role.name));
        for (const [id, name] of roles)
            if (!(name.name === "@everyone") && !(name.name === "Rombot"))
                guild.roles.cache.find((role) => role.id === id).setColor("STANDARD");

        for (const color of buttonColors) {
            if (!guild.roles.cache.find((role) => role.name === `${color} tier`))
                guild.roles.create({
                    data: {
                        name: `${color} tier`,
                        color: `${color.toUpperCase()}`,
                        position: 1,
                    },
                    reason: `button ${color} tier`,
                });
        }

        if (!(await keyv.get(guild.id + ":button"))) {
            await keyv.set(guild.id + ":button", buttonColors.length);
            let interval = setInterval(async function () {
                await keyv.set(guild.id + ":button", (await keyv.get(guild.id + ":button")) - 1);
                if ((await keyv.get(guild.id + ":button")) === 0) {
                    clearInterval(interval);
                    return channel.send(
                        new MessageEmbed()
                            .setTitle("Button died")
                            .setDescription("Type `R!button start` to start the button again.")
                            .setColor(0xff0000)
                    );
                }
            }, 10000);
            return channel.send(
                new MessageEmbed()
                    .setTitle("Start button")
                    .setDescription("Button has started.")
                    .setColor(0xff0000)
            );
        }
        await keyv.set(guild.id + ":button", buttonColors.length);
        return channel.send(
            new MessageEmbed()
                .setTitle("Restart button")
                .setDescription("Button has restarted.")
                .setColor(0xff0000)
        );
    }
    if (arg === "press") {
        if (!(await keyv.get(guild.id + ":button")))
            return message.reply("The button  is dead or not started yet.");
        for (const color of buttonColors)
            message.member.roles.remove(
                guild.roles.cache.find((role) => role.name === `${color} tier`)
            );
        let roleColor = (await keyv.get(guild.id + ":button")) - 1;
        message.member.roles.add(
            guild.roles.cache.find((role) => role.name === `${buttonColors[roleColor]} tier`)
        );
        await keyv.set(guild.id + ":button", buttonColors.length);
        return message.reply(`You got ${buttonColors[roleColor]} tier.`);
    }

    if (arg === "look") {
        let currColorIndex = (await keyv.get(guild.id + ":button")) - 1;
        let currColor = buttonColors[currColorIndex];

        if (!currColor) return message.reply("The button  is dead or not installed yet.");
        let colorEmojis = "";
        for (const color of buttonColors) colorEmojis = colorEmojis + `:${color}_square:`;
        let countDownEmoji = "";

        for (let i = 0; i < buttonColors.length; i++)
            if (i < currColorIndex + 1) countDownEmoji = countDownEmoji + ":white_large_square:";
            else countDownEmoji = countDownEmoji + ":white_square_button:";

        return channel.send(
            new MessageEmbed()
                .setTitle("Button")
                .setDescription(`The button is now ${currColor}\n${colorEmojis}\n${countDownEmoji}`)
                .setColor(0xff0000)
        );
    }
};
