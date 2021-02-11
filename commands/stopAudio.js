module.exports = (message, client) => {
    client.voice.connections.array().forEach((connection) => connection.disconnect());
    message.channel.send("Rombot disconnected");
}