module.exports.run = async (client, message, args) => {
    await message.channel.send(await client.commands.map(m => m.help.dmCommand).join(', '));
}

module.exports.help = {
    name: "test",
    description: "test",
    usage: "test",
    type: ""
}
