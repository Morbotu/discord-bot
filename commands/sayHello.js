module.exports = message => {
    const channel = message.channel;
    channel.send(message.content + " <@" + message.author.id + ">");
}