const ytdl = require('ytdl-core');

module.exports = (message) => {
    if (message.content.split(" ").length !== 2)
        return message.channel.send("This command requires 1 argument.").catch(console.error);;
    if (!message.member.voice.channel)
        return message.channel.send("You need to be in a voice channel to use this command.").catch(console.error);;
    message.member.voice.channel.join().then((connection) => {
        connection.play(ytdl(message.content.split(" ")[1], { filter: 'audioonly' }))
            .on("finish", () => connection.disconnect());
    }).catch(console.error);
}