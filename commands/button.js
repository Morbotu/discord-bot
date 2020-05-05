module.exports = async (message, keyv, MessageEmbed) => {
    // Check if there is only one argument. id: 0x0000
    // -------------------------------------------------------------
    if (message.content.split(" ").length > 2)
        return message.reply("This command only has one argument.");
    // -------------------------------------------------------------

    // Declare const's for the code. id: 0x0001
    // -----------------------------------------------------
    const arg = message.content.toLowerCase().split(" ")[1];
    const colors = ["blue", "red", "green"]; // Change for more colors. Right is lower tier and left higher.
    const channel = message.channel;
    const guild = message.guild;
    // -----------------------------------------------------

    if (arg === "start") { // Start command. id: 0x0003
        // Get all the roles except from the color roles. id: 0x0002
        // --------------------------------------------------------------------------
        const check = [];
        for (const color of colors)
            check.push(`${color} tier`);
        const roles = guild.roles.cache.filter(role => !(check.includes(role.name)));
        // --------------------------------------------------------------------------

        // Set all colors to STANDARD. id: 0x0007
        // -------------------------------------------------------------------------
        for (const [id, name] of roles)
            if (!(name.name === "@everyone") && !(name.name === "Rombot"))
                guild.roles.cache.find(role => role.id === id).setColor("STANDARD");
        // -------------------------------------------------------------------------

        // Make all roles if they don't exist yet. id: 0x0008
        // ----------------------------------------------------------------------
        for (const color of colors) {
            if (!(guild.roles.cache.find(role => role.name === `${color} tier`)))
                guild.roles.create({
                    data: {
                        name:  `${color} tier`,
                        color: `${color.toUpperCase()}`,
                        position: 1
                    },
                    reason: `button ${color} tier`,
                });
        }
        // ----------------------------------------------------------------------

        // Start the timer. It works if the button is alive but it isn't recommended. id: 0x0009
        // -----------------------------------------------------------------------------------
        if (!(await keyv.get(guild.id + ":button"))) { // Prevend double timers.
            await keyv.set(guild.id + ":button", colors.length);
            let interval = setInterval(async function() {
                await keyv.set(guild.id + ":button", await keyv.get(guild.id + ":button") - 1);
                if (await keyv.get(guild.id + ":button") === 0) {
                    clearInterval(interval);
                    return channel.send(new MessageEmbed()
                        .setTitle("Button died")
                        .setDescription("Type `R!button start` to start the button again.")
                        .setColor(0xff0000)
                    );
                }
            }, 10000);
            return; // TODO: Write some usefull feedback. id: 0x0006
        }
        await keyv.set(guild.id + ":button", colors.length);
        return; // TODO: Write some usefull feedback. id: 0x0005
        // -----------------------------------------------------------------------------------
    }

    if (arg === "press") { // Press command. id: 0x0004
        // Warns the player that there is no button to press. id: 0x000a
        // -----------------------------------------------------------------
        if (!(await keyv.get(guild.id + ":button")))
            return message.reply("The button  is dead or not started yet.");
        // -----------------------------------------------------------------

        // Remove all color roles the player has. id: 0x000b
        // -------------------------------------------------------------------------------------------
        for (const color of colors)
            message.member.roles.remove(guild.roles.cache.find(role => role.name === `${color} tier`));
        // -------------------------------------------------------------------------------------------

        // Asign new role to player and reset the timer. id: 0x000c
        // ------------------------------------------------------------------------------------------------
        let roleColor = await keyv.get(guild.id + ":button")-1;
        message.member.roles.add(guild.roles.cache.find(role => role.name === `${colors[roleColor]} tier`));
        await keyv.set(guild.id + ":button", colors.length);
        return message.reply(`You got ${colors[roleColor]} tier.`);
        // ------------------------------------------------------------------------------------------------
    }

    if (arg === "look") { // Look command. id: 0x000d
        // Get the color that is currently on. id: 0x000e
        // ------------------------------------------------------------------
        let currColorIndex = await keyv.get(guild.id + ":button")-1;
        let currColor = colors[currColorIndex];
        // ------------------------------------------------------------------

        // Check if the button isn't active. id: 0x000f
        // ------------------------------------------------------------------
        if (!currColor)
            return message.reply("The button  is dead or not installed yet.");
        // ------------------------------------------------------------------

        // Make a bar of the color emoji's. id: 0x0010
        // ------------------------------------------------
        let colorEmojis = "";
        for (const color of colors)
            colorEmojis = colorEmojis + `:${color}_square:`;
        // ------------------------------------------------

        // Make a bar of the active color emoji's. id: 0x0011
        // ---------------------------------------------------------------
        let countdownEmoji = "";
        for (let i = 0; i < colors.length; i++)
            if (i < currColorIndex+1)
                countdownEmoji = countdownEmoji + ":white_large_square:";
            else
                countdownEmoji = countdownEmoji + ":white_square_button:";
        // ---------------------------------------------------------------

        // Return the current color in a nice embed message. id: 0x00012
        // -------------------------------------------------------------------------------------
        return channel.send(new MessageEmbed()
            .setTitle("Button")
            .setDescription(`The button is now ${currColor}\n${colorEmojis}\n${countdownEmoji}`)
            .setColor(0xff0000)
        );
        // -------------------------------------------------------------------------------------
    }
}
