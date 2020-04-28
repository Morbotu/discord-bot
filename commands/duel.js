module.exports = async (keyv, MessageEmbed, message) => {
    const channel = message.channel;
    if (message.content.toLowerCase().startsWith("duel")) {
        if (await keyv.get(message.author.id + ":occupied"))
            return message.reply("You are already in a fight or you need to awnser a request.");
        const opponent = message.mentions.members.first();
        if (!opponent) 
            return message.reply("Mention the player you want to challenge.");
        if (await keyv.get(opponent.user.id + ":occupied")) 
            return message.reply("This player is already in a fight or still needs to awnser a request.");
        await keyv.set(opponent.user.id + ":occupied", true);
        await keyv.set(opponent.user.id + ":challenged", true);
        await keyv.set(opponent.user.id + ":challenger", message.author.id);
        await keyv.set(message.author.id + ":occupied", true);
        await keyv.set(message.author.id + ":challenging", true);
        setTimeout(async function() {
            if (await keyv.get(message.author.id + ":challenging")) {
                await keyv.set(opponent.user.id + ":occupied");
                await keyv.set(opponent.user.id + ":challenged");
                await keyv.set(opponent.user.id + ":challenger");
                await keyv.set(message.author.id + ":occupied");
                await keyv.set(message.author.id + ":challenging");
                return channel.send("Duel expired.");
            }
        },
        30000);
        return channel.send(opponent.toString() + " has 30 seconds to accept with `yes` or refuse with `no`");
    }
    if (message.content.toLowerCase() === "yes" && await keyv.get(message.author.id + ":challenged")) {
        let challenger = await keyv.get(message.author.id + ":challenger");
        await keyv.delete(message.author.id + ":challenged");
        await keyv.delete(challenger + ":challenging");
        await keyv.delete(message.author.id + ":challenger");
        let room = "room" + Math.floor(Math.random() * 10000);
        let rooms = [];
        if (await keyv.get("rooms") != null)
            rooms = rooms.concat(await keyv.get("rooms"));
        while (rooms.includes(room))
            room = "room" + Math.floor(Math.random() * 10000);
        rooms.push(room);
        await keyv.set("rooms", rooms);
        await keyv.set(room + ":players", message.author.id + ":" + challenger);
        let turn = Math.floor(Math.random() * 2);
        await keyv.set(room + ":turn", turn);
        await keyv.set(room + ":health", [100, 100]);
        await keyv.set(message.author.id + ":room", room);
        await keyv.set(challenger + ":room", room);
        await keyv.set(message.author.id + ":dueling", true);
        await keyv.set(challenger + ":dueling", true);
        return channel.send(new MessageEmbed()
            .setTitle(message.author.username + " accepted")
            .setDescription("\nIt's <@" + (await keyv.get(room + ":players")).split(":")[turn] + 
                "> turn\nYou can use:\n" +
                "`bite` 10 damage 100% success rate\n" +
                "`punch` 20 damage 80% success rate\n" +
                "`stab` 30 damage 60% success rate\n" +
                "`mega_punch` 40 damage 40% success rate")
            .setColor(0xff0000)
        );
    }
    if (message.content.toLowerCase() === "no" && await keyv.get(message.author.id + ":challenged")) {
        let challenger = await keyv.get(message.author.id + ":challenger")
        await keyv.delete(message.author.id + ":occupied");
        await keyv.delete(message.author.id + ":challenged");
        await keyv.delete(message.author.id + ":challenger");
        await keyv.delete(challenger + ":occupied");
        await keyv.delete(challenger + ":challenging");
        return channel.send("<@" + message.author.id + "> refused");
    }
    if (await keyv.get(message.author.id + ":dueling")) {
        var room = await keyv.get(message.author.id + ":room");
        var health = await keyv.get(room + ":health");
        var turn = await keyv.get(room + ":turn");
        var players = (await keyv.get(room + ":players")).split(":");
        var turnId = players[turn];
        if (message.content.toLowerCase() === "bite") {
            if (!(message.author.id === turnId))
                return message.reply("It's not your turn.");
            if (turn === 0) {
                await keyv.set(room + ":health", [health[0], health[1]-10]);
                await keyv.set(room + ":turn", 1);
            }
            if (turn === 1) {
                await keyv.set(room + ":health", [health[0]-10, health[1]]);
                await keyv.set(room + ":turn", 0);
            }
        }
        if (message.content.toLowerCase() === "punch") {
            if (!(message.author.id === turnId))
                return message.reply("It's not your turn.");
            if (turn === 0) {
                if (Math.ceil(Math.random() * 10) > 8) {
                    await keyv.set(room + ":turn", 1);
                    return channel.send(new MessageEmbed()
                        .setTitle("Attack failed.")
                        .setColor(0xff0000)
                    );
                }
                await keyv.set(room + ":health", [health[0], health[1]-20]);
                await keyv.set(room + ":turn", 1);
            }
            if (turn === 1) {
                if (Math.ceil(Math.random() * 10) > 8) {
                    await keyv.set(room + ":turn", 0);
                    return channel.send(new MessageEmbed()
                        .setTitle("Attack failed.")
                        .setColor(0xff0000)
                    );
                }
                await keyv.set(room + ":health", [health[0]-20, health[1]]);
                await keyv.set(room + ":turn", 0);
            }
        }
        if (message.content.toLowerCase() === "stab") {
            if (!(message.author.id === turnId))
                return message.reply("It's not your turn.");
            if (turn === 0) {
                if (Math.ceil(Math.random() * 10) > 6) {
                    await keyv.set(room + ":turn", 1);
                    return channel.send(new MessageEmbed()
                        .setTitle("Attack failed.")
                        .setColor(0xff0000)
                    );
                }
                await keyv.set(room + ":health", [health[0], health[1]-30]);
                await keyv.set(room + ":turn", 1);
            }
            if (turn === 1) {
                if (Math.ceil(Math.random() * 10) > 6) {
                    await keyv.set(room + ":turn", 0);
                    return channel.send(new MessageEmbed()
                        .setTitle("Attack failed.")
                        .setColor(0xff0000)
                    );
                }
                await keyv.set(room + ":health", [health[0]-30, health[1]]);
                await keyv.set(room + ":turn", 0);
            }
        }
        if (message.content.toLowerCase() === "mega_punch") {
            if (!(message.author.id === turnId))
                return message.reply("It's not your turn.");
            if (turn === 0) {
                if (Math.ceil(Math.random() * 10) > 4) {
                    await keyv.set(room + ":turn", 1);
                    return channel.send(new MessageEmbed()
                        .setTitle("Attack failed.")
                        .setColor(0xff0000)
                    );
                }
                await keyv.set(room + ":health", [health[0], health[1]-40]);
                await keyv.set(room + ":turn", 1);
            }
            if (turn === 1) {
                if (Math.ceil(Math.random() * 10) > 4) {
                    await keyv.set(room + ":turn", 0);
                    return channel.send(new MessageEmbed()
                        .setTitle("Attack failed.")
                        .setColor(0xff0000)
                    );
                }
                await keyv.set(room + ":health", [health[0]-40, health[1]]);
                await keyv.set(room + ":turn", 0);
            }
        }
        if (message.content.toLowerCase() === "hack") {
            if (!(message.author.id === turnId))
                return message.reply("It's not your turn.");
            if (!(message.author.tag === "Morbotu#3961"))
                return channel.send("You are not skilled enough to do that.");
            if (turn === 0) {
                await keyv.set(room + ":health", [health[0], health[1]-100]);
                await keyv.set(room + ":turn", 1);
            }
            if (turn === 1) {
                await keyv.set(room + ":health", [health[0]-100, health[1]]);
                await keyv.set(room + ":turn", 0);
            }
        }
        let newHealth = await keyv.get(room + ":health");
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
            rooms.splice(rooms.indexOf(room),1);
            await keyv.set("rooms", rooms);
            return channel.send(new MessageEmbed()
                .setTitle("Battle is over.")
                .setDescription("<@" + players[1] + "> won")
                .setColor(0xff0000)
            );
        }
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
            rooms.splice(rooms.indexOf(room),1);
            await keyv.set("rooms", rooms);
            return channel.send(new MessageEmbed()
                .setTitle("Battle is over.")
                .setDescription("<@" + players[0] + "> won")
                .setColor(0xff0000)
            );
        }
    
        return channel.send(new MessageEmbed()
            .setTitle("Attack was succesfull.")
            .setDescription("<@" + players[0] + "> health: " + newHealth[0] + "\n<@" + players[1] + "> health: " + newHealth[1])
            .setColor(0xff0000)
        );
    }
}