exports.run = async (client, message, args) => {
	const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);

}

exports.help = {
    name: "ping",
    description: "Checks ping. HELLO RETARD",
    usage: "ping",
    type: "help",
    dmCommand: true
}
exports.conf = {
    aliases: ['p'],
}