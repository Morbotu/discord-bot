/* ------------------------- SECTION Attack function. ------------------------ */
async function attack(damage, successChange, keyv, message, turnId, turn, room, health) {
    /* ----------- ANCHOR Return if it is not the turn of the player. ----------- */
    if (!(message.author.id === turnId)) return 1;
    /* -------------------------------------------------------------------------- */

    if (turn === 0) {
        /* ---------------- ANCHOR Returns if the attack has failed. ---------------- */
        if (Math.ceil(Math.random() * 100) > successChange) {
            await keyv.set(room + ":turn", 1);
            return 0;
        }
        /* -------------------------------------------------------------------------- */

        await keyv.set(room + ":health", [health[0], health[1] - damage]);
        await keyv.set(room + ":turn", 1);
    }
    if (turn === 1) {
        /* ---------------- ANCHOR Returns if the attack has failed. ---------------- */
        if (Math.ceil(Math.random() * 100) > successChange) {
            await keyv.set(room + ":turn", 0);
            return 0;
        }
        /* -------------------------------------------------------------------------- */

        await keyv.set(room + ":health", [health[0] - damage, health[1]]);
        await keyv.set(room + ":turn", 0);
    }
}
/* -------------------------------- !SECTION -------------------------------- */

/* ------------------------ SECTION Code of module. ------------------------ */
module.exports = async (keyv, MessageEmbed, message, globalPrefix) => {
    const channel = message.channel;

    /* ------------------------- SECTION "duel" command. ------------------------ */
    if (message.content.toLowerCase().startsWith(globalPrefix + "duel")) {
        /* ------------------ ANCHOR Test for invalid command use. ------------------ */
        if (message.mentions.members.keyArray().length > 1) {
            return message.reply("You can only mention one player.");
        }
        const opponent = message.mentions.members.first();
        if (!opponent) return message.reply("Mention the player you want to challenge.");
        /* -------------------------------------------------------------------------- */

        /* ------ ANCHOR Tests if one of the two players are already in a duel. ----- */
        if (await keyv.get(message.author.id + ":occupied"))
            return message.reply("You are already in a fight or you need to answer a request.");
        if (await keyv.get(opponent.user.id + ":occupied"))
            return message.reply(
                "This player is already in a fight or still needs to answer a request."
            );
        /* -------------------------------------------------------------------------- */

        /* -------------- ANCHOR Test if the invite cool down is over. -------------- */
        if (await keyv.get(message.author.id + ":timer")) {
            let d = new Date();
            let timeLeft =
                30 -
                Math.round(
                    (d.getTime() - (await keyv.get(message.author.id + ":timeLeft"))) / 1000
                );
            return message.reply(
                `You need to wait ${timeLeft} seconds before you can send another request.`
            );
        }
        /* -------------------------------------------------------------------------- */

        // REVIEW Maybe make the variables in keyv part more compact or just use an entire other system.
        /* ------------- ANCHOR Setup all variables for a duel request. ------------- */
        await keyv.set(opponent.user.id + ":occupied", true);
        await keyv.set(opponent.user.id + ":challenged", true);
        await keyv.set(opponent.user.id + ":challenger", message.author.id);
        await keyv.set(message.author.id + ":occupied", true);
        await keyv.set(message.author.id + ":challenging", true);
        await keyv.set(message.author.id + ":expire", true);
        await keyv.set(message.author.id + ":timer", true);
        let d = new Date();
        await keyv.set(message.author.id + ":timeLeft", d.getTime());
        setTimeout(async function () {
            if (await keyv.get(message.author.id + ":expire")) {
                await keyv.delete(message.author.id + ":expire");
                await keyv.delete(message.author.id + ":timer");
                await keyv.delete(message.author.id + ":timeLeft");
                await keyv.set(opponent.user.id + ":occupied");
                await keyv.set(opponent.user.id + ":challenged");
                await keyv.set(opponent.user.id + ":challenger");
                await keyv.set(message.author.id + ":occupied");
                await keyv.set(message.author.id + ":challenging");
                return channel.send("Duel expired.");
            }
            await keyv.delete(message.author.id + ":timeLeft");
            await keyv.delete(message.author.id + ":timer");
            return channel.send(`${message.author.toString()}, You can now duel someone.`);
        }, 30000);
        /* -------------------------------------------------------------------------- */

        return channel.send(
            `${opponent.toString()} has 30 seconds to accept with \`yes\` or refuse with \`no\``
        );
    }
    /* -------------------------------- !SECTION -------------------------------- */

    /* ----------------- SECTION "yes" command to accept invite. ---------------- */
    if (
        message.content.toLowerCase() === "yes" &&
        (await keyv.get(message.author.id + ":challenged"))
    ) {
        let challenger = await keyv.get(message.author.id + ":challenger"); // NOTE Get the challenger id.

        /* ---------------- ANCHOR Remove variables for the request. ---------------- */
        await keyv.delete(challenger + ":expire");
        await keyv.delete(message.author.id + ":challenged");
        await keyv.delete(challenger + ":challenging");
        await keyv.delete(message.author.id + ":challenger");
        /* -------------------------------------------------------------------------- */

        /* ------------------- ANCHOR Create a room for the duel. ------------------- */
        let room = "room" + Math.floor(Math.random() * 10000);
        let rooms = [];
        if ((await keyv.get("rooms")) != null) rooms = rooms.concat(await keyv.get("rooms"));
        while (rooms.includes(room)) room = "room" + Math.floor(Math.random() * 10000);
        rooms.push(room);
        await keyv.set("rooms", rooms);
        /* -------------------------------------------------------------------------- */

        /* ----------------- ANCHOR Declare variables for the duel. ----------------- */
        await keyv.set(room + ":players", message.author.id + ":" + challenger);
        let turn = Math.floor(Math.random() * 2);
        await keyv.set(room + ":turn", turn);
        await keyv.set(room + ":health", [100, 100]);
        await keyv.set(message.author.id + ":room", room);
        await keyv.set(challenger + ":room", room);
        await keyv.set(message.author.id + ":dueling", true);
        await keyv.set(challenger + ":dueling", true);
        return channel.send(
            new MessageEmbed()
                .setTitle(`${message.author.username} accepted`)
                .setDescription(
                    "\nIt's <@" +
                        (await keyv.get(room + ":players")).split(":")[turn] +
                        "> turn\nYou can use:\n" +
                        "`bite` 10 damage 100% success rate\n" +
                        "`punch` 20 damage 80% success rate\n" +
                        "`stab` 30 damage 60% success rate\n" +
                        "`mega_punch` 40 damage 40% success rate"
                )
                .setColor(0xff0000)
        );
        /* -------------------------------------------------------------------------- */
    }
    /* -------------------------------- !SECTION -------------------------------- */

    /* ----------------- SECTION "no" command to refuse invite. ----------------- */
    if (
        message.content.toLowerCase() === "no" &&
        (await keyv.get(message.author.id + ":challenged"))
    ) {
        /* ---------------------- ANCHOR Delete all variables. ---------------------- */
        let challenger = await keyv.get(message.author.id + ":challenger"); // NOTE Get the challengers id.
        await keyv.delete(message.author.id + ":occupied");
        await keyv.delete(message.author.id + ":challenged");
        await keyv.delete(message.author.id + ":challenger");
        await keyv.delete(challenger + ":expire");
        await keyv.delete(challenger + ":occupied");
        await keyv.delete(challenger + ":challenging");
        /* -------------------------------------------------------------------------- */

        return channel.send(`${message.author.toString()} refused`);
    }
    /* -------------------------------- !SECTION -------------------------------- */

    /* ---------------- SECTION If duel is active do this part. --------------- */
    if (await keyv.get(message.author.id + ":dueling")) {
        /* ------------- ANCHOR Declare variables for rest of the code. ------------- */
        var room = await keyv.get(message.author.id + ":room");
        var health = await keyv.get(room + ":health");
        var turn = await keyv.get(room + ":turn");
        var players = (await keyv.get(room + ":players")).split(":");
        var turnId = players[turn];
        /* -------------------------------------------------------------------------- */

        /* -------------------------- ANCHOR "bite" attack. ------------------------- */
        if (message.content.toLowerCase() === "bite") {
            switch (await attack(10, 100, keyv, message, turnId, turn, room, health)) {
                case 0:
                    return message.channel.send(
                        new MessageEmbed().setTitle("Attack failed.").setColor(0xff0000)
                    );
                case 1:
                    return message.reply("It's not your turn.");
            }
        }
        /* -------------------------------------------------------------------------- */

        /* ------------------------- ANCHOR "punch" attack. ------------------------- */
        if (message.content.toLowerCase() === "punch") {
            switch (await attack(20, 80, keyv, message, turnId, turn, room, health)) {
                case 0:
                    return message.channel.send(
                        new MessageEmbed().setTitle("Attack failed.").setColor(0xff0000)
                    );
                case 1:
                    return message.reply("It's not your turn.");
            }
        }
        /* -------------------------------------------------------------------------- */

        /* -------------------------- ANCHOR "stab" attack. ------------------------- */
        if (message.content.toLowerCase() === "stab") {
            switch (await attack(30, 60, keyv, message, turnId, turn, room, health)) {
                case 0:
                    return message.channel.send(
                        new MessageEmbed().setTitle("Attack failed.").setColor(0xff0000)
                    );
                case 1:
                    return message.reply("It's not your turn.");
            }
        }
        /* -------------------------------------------------------------------------- */

        /* ----------------------- ANCHOR "mega_punch" attack. ---------------------- */
        if (message.content.toLowerCase() === "mega_punch") {
            switch (await attack(40, 40, keyv, message, turnId, turn, room, health)) {
                case 0:
                    return message.channel.send(
                        new MessageEmbed().setTitle("Attack failed.").setColor(0xff0000)
                    );
                case 1:
                    return message.reply("It's not your turn.");
            }
        }
        /* -------------------------------------------------------------------------- */

        /* -------------------------- ANCHOR "hack" attack. ------------------------- */
        if (message.content.toLowerCase() === "hack") {
            switch (await attack(100, 100, keyv, message, turnId, turn, room, health)) {
                case 0:
                    return message.channel.send(
                        new MessageEmbed().setTitle("Attack failed.").setColor(0xff0000)
                    );
                case 1:
                    return message.reply("It's not your turn.");
            }
        }
        /* -------------------------------------------------------------------------- */

        /* ------------------------- SECTION Check for win. ------------------------- */
        let newHealth = await keyv.get(room + ":health"); // NOTE Get the new health.

        /* -------------------- ANCHOR Test if player 1 is dead. -------------------- */
        if (newHealth[0] <= 0) {
            let rooms = await keyv.get("rooms");
            await keyv.delete(room + ":health");
            await keyv.delete(room + ":turn");
            await keyv.delete(room + ":players");
            await keyv.delete(players[0] + ":occupied");
            await keyv.delete(players[1] + ":occupied");
            await keyv.delete(players[0] + ":room");
            await keyv.delete(players[1] + ":room");
            await keyv.delete(players[0] + ":dueling");
            await keyv.delete(players[1] + ":dueling");
            rooms.splice(rooms.indexOf(room), 1);
            await keyv.set("rooms", rooms);
            return channel.send(
                new MessageEmbed()
                    .setTitle("Battle is over.")
                    .setDescription(`<@${players[1]}> won`)
                    .setColor(0xff0000)
            );
        }
        /* -------------------------------------------------------------------------- */

        /* -------------------- ANCHOR Test if player 2 is dead. -------------------- */
        if (newHealth[1] <= 0) {
            let rooms = await keyv.get("rooms");
            await keyv.delete(room + ":health");
            await keyv.delete(room + ":turn");
            await keyv.delete(room + ":players");
            await keyv.delete(players[0] + ":occupied");
            await keyv.delete(players[1] + ":occupied");
            await keyv.delete(players[0] + ":room");
            await keyv.delete(players[1] + ":room");
            await keyv.delete(players[0] + ":dueling");
            await keyv.delete(players[1] + ":dueling");
            rooms.splice(rooms.indexOf(room), 1);
            await keyv.set("rooms", rooms);
            return channel.send(
                new MessageEmbed()
                    .setTitle("Battle is over.")
                    .setDescription(`<@${players[0]}> won`)
                    .setColor(0xff0000)
            );
        }
        /* -------------------------------------------------------------------------- */
        /* -------------------------------- !SECTION -------------------------------- */

        /* ----------------------- ANCHOR Send the new health. ---------------------- */
        return channel.send(
            new MessageEmbed()
                .setTitle("Attack was successful.")
                .setDescription(
                    `<@${players[0]}> health: ${newHealth[0]}\n<@${players[1]}> health: ${newHealth[1]}`
                )
                .setColor(0xff0000)
        );
        /* -------------------------------------------------------------------------- */
    }
    /* -------------------------------- !SECTION -------------------------------- */
};
/* -------------------------------- !SECTION -------------------------------- */
