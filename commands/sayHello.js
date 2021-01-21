module.exports = (message) => {
    const channel = message.channel;
    channel.send(message.content + " <@" + message.author.id + ">").catch(console.error);
    if (message.member.voice.channel) {
        message.member.voice.channel.join().then((connection) => {
            connection.play("./sounds/helloSound.mp3").on("finish", () => {
                connection.disconnect();
            });
        }).catch(console.error);
    };
};
