module.exports = (oldState, newState) => {
    if (oldState.member.user.bot) return;

    if (newState.channel && !newState.selfDeaf && oldState.selfDeaf || !oldState.channel && newState.channel && !newState.selfDeaf) {
        newState.channel.join().then((connection) => {
            connection.play("./sounds/helloSound.mp3").on("finish", () => {
                connection.disconnect();
            });
        });
    };

    if (oldState.channel && !newState.channel || newState.selfDeaf && oldState.channel) {
        oldState.channel.join().then((connection) => {
            connection.play("./sounds/goodbyeSound.mp3").on("finish", () => {
                connection.disconnect();
            });
        });
    };
};