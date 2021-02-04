const discordTTS=require("discord-tts");

module.exports = (message) => {
    if (message.member.voice.channel) {
        message.member.voice.channel.join().then((connection) => {
            connection.play(discordTTS.getVoiceStream(message.content.toLowerCase().replace("r!say ", ""))).on("finish", () => {
                connection.disconnect();
            });
        }).catch(console.error);
    };
}