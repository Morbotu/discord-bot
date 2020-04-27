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
        return channel.send("<@" + opponent + "> has 30 seconds to accept with `yes` or refuse with `no`");
    }
    if (message.content.toLowerCase() === "yes" && await keyv.get(message.author.id + ":challenged")) {
        let challenger = await keyv.get(message.author.id + ":challenger");
        await keyv.delete(challenger);
        await keyv.delete(message.author.id + ":challenged");
        await keyv.delete(challenger + ":challenging");
        await keyv.delete(message.author.id + ":challenger");
        let room = "room" + Math.floor(Math.random() * 10000);
        let rooms = [];
        rooms.concat(await keyv.get("rooms"));
        while (rooms.includes(room))
            room = "room" + Math.floor(Math.random() * 10000);
        rooms.push(room);
        await keyv.set("rooms", rooms);
        await keyv.set(room + ":players", message.author.id + ":" + challenger);
        let turn = Math.round(Math.random());
        await keyv.set(room + ":turn", turn);
        await keyv.set(room + ":health", [100, 100]);
        await keyv.set(message.author.id + ":room", room);
        await keyv.set(challenger + ":room", room);
        await keyv.set(message.author.id + ":dueling", true);
        await keyv.set(challenger + ":dueling", true);
        return channel.send("<@" + message.author.id + "> accepted\nIt's <@" + 
            (await keyv.get(room + ":players")).split(":")[turn] + ">");
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
    let room = await keyv.get(message.author.id + ":room");
    let health = await keyv.get(room + ":health");
    let turn = await keyv.get(room + ":turn");
    let players = (await keyv.get(room + ":players")).split(":");
    let turnId = players[turn];
    if (message.content.toLowerCase() === "bite" && await keyv.get(message.author.id + ":dueling")) {
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
    if (message.content.toLowerCase() === "punch" && await keyv.get(message.author.id + ":dueling")) {
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
    if (message.content.toLowerCase() === "stab" && await keyv.get(message.author.id + ":dueling")) {
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
    if (message.content.toLowerCase() === "mega_punch" && await keyv.get(message.author.id + ":dueling")) {
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
    let rooms = await keyv.get("rooms");
    if ((await keyv.get(room + ":health"))[0] <= 0) {
        await keyv.delete(room + ":health");
        await keyv.delete(room + ":turn");
        await keyv.delete(room + ":players");
        await keyv.delete(players[0] + ":occupied");
        await keyv.delete(players[1] + ":occupied");
        await keyv.delete(players[0] + ":room");
        await keyv.delete(players[1] + ":room");
        await keyv.delete(players[0] + ":dueling");
        await keyv.delete(players[1] + ":dueling");
        rooms.splice(rooms.indexOf(room));
        await keyv.set("rooms", rooms);
        return channel.send(new MessageEmbed()
            .setTitle("Battle is over.")
            .setDescription("<@" + players[1] + "> won")
            .setColor(0xff0000)
        );
    }
    if ((await keyv.get(room + ":health"))[1] <= 0) {
        await keyv.delete(room + ":health");
        await keyv.delete(room + ":turn");
        await keyv.delete(room + ":players");
        await keyv.delete(players[0] + ":occupied");
        await keyv.delete(players[1] + ":occupied");
        await keyv.delete(players[0] + ":room");
        await keyv.delete(players[1] + ":room");
        await keyv.delete(players[0] + ":dueling");
        await keyv.delete(players[1] + ":dueling");
        rooms.splice(rooms.indexOf(room));
        await keyv.set("rooms", rooms);
        return channel.send(new MessageEmbed()
            .setTitle("Battle is over.")
            .setDescription("<@" + players[0] + "> won")
            .setColor(0xff0000)
        );
    }
    if (await keyv.get(message.author.id + ":dueling"))
        return channel.send(new MessageEmbed()
            .setTitle("Attack was succesfull.")
            .setDescription(await keyv.get(room + ":health"))
            .setColor(0xff0000)
        );
}