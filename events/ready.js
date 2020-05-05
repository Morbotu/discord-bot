module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`); // Confirm the bot has logged in. id: 0x0000
    return client.user.setActivity("R!help", { type: "WATCHING" }) // Set activity watching. id: 0x0001
}