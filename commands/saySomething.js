const discordTTS=require("discord-tts");

module.exports = (message) => {
    if (message.member.voice.channel) {
        message.member.voice.channel.join().then((connection) => {
            connection.play(discordTTS.getVoiceStream(message.content.toLowerCase().replace("r!say ", "").substring(0, 200))).on("finish", () => {
                connection.disconnect();
            });
        }).catch(console.error);
    };
}