module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    return client.user.setActivity("R!help", { type: "WATCHING" })
}