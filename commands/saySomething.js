const discordTTS = require("discord-tts");

function sayTextRecursively(text, connection) {
    let speakText = text.splice(0, 1).join(" ").substring(0, 200);
    connection.play(discordTTS.getVoiceStream(speakText)).on("finish", () => {
        if (text.length == 0)
            connection.disconnect();
        else sayTextRecursively(text, connection)
    });
}

module.exports = (message) => {
    if (message.content.split(" ").length < 2)
        return message.channel.send("You need at least 1 argument.").catch(console.error);

    if (!message.member.voice.channel) {
        return message.channel.send("You need to be in a voice channel to use this command.").catch(console.error);    
    }
    message.member.voice.channel.join().then((connection) => {
        sayTextRecursively(message.content.toLowerCase().replace("r!say ", "").split(/[\n,.]/).filter((item) => item !== ""), connection);
    }).catch(console.error);
}