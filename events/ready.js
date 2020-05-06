/* ------------------------ SECTION Code of module. ----------------------- */
module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`); // NOTE Confirm the bot has logged in.
    return client.user.setActivity("R!help", { type: "WATCHING" }); // NOTE Set activity watching.
};
/* -------------------------------- !SECTION -------------------------------- */
