module.exports = (MessageEmbed, message) => {
    const channel = message.channel;
    if (message.content.split(" ").length === 2) {
        const helpSubject = message.content.split(" ")[1];
        if (helpSubject === "duel")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: duel")
                    .setDescription(
                        "**Usage:**\n`R!duel @player`\n\n**Description:**\nChallenge other players in a luck based duel."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "button")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: button")
                    .setDescription(
                        "**Usage:**\n`R!help button_start`,`R!help button_look`,`R!help button_press`,`R!help button_reset`\n\n**Description:**\nPlay a exiting game where the player that is online the most wins."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "button_start")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: button start")
                    .setDescription(
                        "**Usage:**\n`R!button start`\n\n**Description:**\nStart the timer for the button."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "button_look")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: button look")
                    .setDescription(
                        "**Usage:**\n`R!button look`\n\n**Description:**\nLook on what color the button is."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "button_press")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: button press")
                    .setDescription(
                        "**Usage:**\n`R!button press`\n\n**Description:**\nPress the button to get the tier it's currently on."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "button_reset")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: button press")
                    .setDescription(
                        "**Usage:**\n`R!button reset`\n\n**Description:**\nReset all tiers from all players."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "say") 
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: say")
                    .setDescription(
                        "**Usage:**\n`R!say 'thing to say'`\n\n**Description:**\nLets rombot say something in the voice channel you are in."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "play")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: play")
                    .setDescription(
                        "**Usage:**\n`R!play 'A youtube link'`\n\n**Description:**\nLets rombot play the audio of a youtube video in the voice channel you are in."
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
        if (helpSubject === "stop")
            return channel.send(
                new MessageEmbed()
                    .setTitle("Help page: stop")
                    .setDescription(
                        "**Usage:**\n`R!stop`\n\n*Description:**\nDisconnects rombot from all voice channels"
                    )
                    .setColor(0xff0000)
            ).catch(console.error);
    }

    return channel.send(
        new MessageEmbed()
            .setTitle("Help page")
            .setDescription(
                "**Commands:**\n`duel`, `button`, `say`, `play`, `stop`\n\nSee the project on github [Rombout124/discord-bot](https://github.com/Rombout124/discord-bot)."
            )
            .setColor(0xff0000)
    ).catch(console.error);
};
