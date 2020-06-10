module.exports = (client) => {
    return client.user
        .setActivity("R!help", { type: "WATCHING" })
        .then(() => console.log(`Logged in as ${client.user.tag}!`))
        .catch(console.error);
};
