/* ------------------------ SECTION Code of function. ----------------------- */
module.exports = (MessageEmbed, message) => {
    /* ---------------------- ANCHOR Helps with a command. ---------------------- */
    if (message.content.split(" ").length === 2) {
        const helpSubject = message.content.split(" ")[1]; // NOTE Gets the command.
        if (helpSubject === "duel")
            // NOTE Help duel.
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("Help page: duel")
                    .setDescription(
                        "**Usage:**\n`R!duel @player`\n\n**Description:**\nChallenge other players in a luck based duel."
                    )
                    .setColor(0xff0000)
            );
        // TODO Create a help page for the button.
    }
    /* -------------------------------------------------------------------------- */

    /* -------------- ANCHOR Returns all commands if no arguments. -------------- */
    return message.channel.send(
        new MessageEmbed()
            .setTitle("Help page")
            .setDescription("**Commands:**\n`duel`")
            .setColor(0xff0000)
    );
    /* -------------------------------------------------------------------------- */
};
/* -------------------------------- !SECTION -------------------------------- */
