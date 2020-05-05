module.exports = (MessageEmbed, message) => {
    // Helps with a command. id: 0x0000
    // -----------------------------------------------------------------------------------------------------------------------
    if (message.content.split(" ").length === 2) { 
        const helpSubject = message.content.split(" ")[1] // Gets the command. id: 0x0001
        if (helpSubject === "duel") // Help duel. id: 0x0002
            return message.channel.send(new MessageEmbed()
            .setTitle("Help page: duel")
            .setDescription("**Usage:**\n`R!duel @player`\n\n**Description:**\nChallenge other players in a luck based duel.")
            .setColor(0xff0000)
        );
        // TODO: Create a help page for the button. id: 0x0004
    }
    // -----------------------------------------------------------------------------------------------------------------------

    // Returns all commands if no arguments. id: 0x0003
    // -------------------------------------------
    return message.channel.send(new MessageEmbed()
        .setTitle("Help page")
        .setDescription("**Commands:**\n`duel`")
        .setColor(0xff0000)
    );
    // -------------------------------------------
}