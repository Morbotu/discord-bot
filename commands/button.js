/* ------------------------ SECTION Code of module. ------------------------ */
module.exports = async (message, keyv, MessageEmbed) => {
    /* --------------- ANCHOR Check if there is only one argument. -------------- */
    if (message.content.split(" ").length > 2)
        return message.reply("This command only has one argument.");
    /* -------------------------------------------------------------------------- */

    /* ------------------ ANCHOR Declare const's for the code. ------------------ */
    const arg = message.content.toLowerCase().split(" ")[1];
    const colors = ["blue", "red", "green"]; // NOTE Change for more colors. Right is lower tier and left higher.
    const channel = message.channel;
    const guild = message.guild;
    /* -------------------------------------------------------------------------- */

    /* ------------------------- SECTION "Start" command. ------------------------- */
    if (arg === "start") {
        /* ---------- ANCHOR Get all the roles except from the color roles. --------- */
        const check = [];
        for (const color of colors) check.push(`${color} tier`);
        const roles = guild.roles.cache.filter((role) => !check.includes(role.name));
        /* -------------------------------------------------------------------------- */

        /* -------------- ANCHOR Set all colors from roles to STANDARD. ------------- */
        for (const [id, name] of roles)
            if (!(name.name === "@everyone") && !(name.name === "Rombot"))
                guild.roles.cache.find((role) => role.id === id).setColor("STANDARD");
        /* -------------------------------------------------------------------------- */

        /* ------------ ANCHOR Make button roles if they don't exist yet. ----------- */
        for (const color of colors) {
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
        /* -------------------------------------------------------------------------- */

        /* ------------------------- ANCHOR Start the timer. ------------------------ */
        if (!(await keyv.get(guild.id + ":button"))) {
            // Prevent double timers.
            await keyv.set(guild.id + ":button", colors.length);
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
        await keyv.set(guild.id + ":button", colors.length);
        return channel.send(
            new MessageEmbed()
                .setTitle("Restart button")
                .setDescription("Button has restarted.")
                .setColor(0xff0000)
        );
        /* -------------------------------------------------------------------------- */
    }
    /* -------------------------------- !SECTION -------------------------------- */

    /* ------------------------ SECTION "Press" command. ------------------------ */
    if (arg === "press") {
        /* -------- ANCHOR Warns the player that there is no button to press. ------- */
        if (!(await keyv.get(guild.id + ":button")))
            return message.reply("The button  is dead or not started yet.");
        /* -------------------------------------------------------------------------- */

        /* ------------- ANCHOR Remove all button roles the player has. ------------- */
        for (const color of colors)
            message.member.roles.remove(
                guild.roles.cache.find((role) => role.name === `${color} tier`)
            );
        /* -------------------------------------------------------------------------- */

        /* ---------- ANCHOR Assign new role to player and reset the timer. ---------- */
        let roleColor = (await keyv.get(guild.id + ":button")) - 1;
        message.member.roles.add(
            guild.roles.cache.find((role) => role.name === `${colors[roleColor]} tier`)
        );
        await keyv.set(guild.id + ":button", colors.length);
        return message.reply(`You got ${colors[roleColor]} tier.`);
        /* -------------------------------------------------------------------------- */
    }
    /* -------------------------------- !SECTION -------------------------------- */

    /* ------------------------- SECTION "look" command. ------------------------ */
    if (arg === "look") {
        /* --------------- ANCHOR Get the color that is currently on. --------------- */
        let currColorIndex = (await keyv.get(guild.id + ":button")) - 1;
        let currColor = colors[currColorIndex];
        /* -------------------------------------------------------------------------- */

        /* ---------------- ANCHOR Check if the button isn't active. ---------------- */
        if (!currColor) return message.reply("The button  is dead or not installed yet.");
        /* -------------------------------------------------------------------------- */

        /* ----------------- ANCHOR Make a bar of the color emoji's. ---------------- */
        let colorEmojis = "";
        for (const color of colors) colorEmojis = colorEmojis + `:${color}_square:`;
        /* -------------------------------------------------------------------------- */

        /* ------------- ANCHOR Make a bar of the active color emoji's. ------------- */
        let countdownEmoji = "";
        for (let i = 0; i < colors.length; i++)
            if (i < currColorIndex + 1) countdownEmoji = countdownEmoji + ":white_large_square:";
            else countdownEmoji = countdownEmoji + ":white_square_button:";
        /* -------------------------------------------------------------------------- */

        /* -------- ANCHOR Return the current color in a nice embed message. -------- */
        return channel.send(
            new MessageEmbed()
                .setTitle("Button")
                .setDescription(`The button is now ${currColor}\n${colorEmojis}\n${countdownEmoji}`)
                .setColor(0xff0000)
        );
        /* -------------------------------------------------------------------------- */
    }
    /* -------------------------------- !SECTION -------------------------------- */
};
/* -------------------------------- !SECTION -------------------------------- */
