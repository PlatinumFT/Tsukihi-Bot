module.exports.run = async (client, message, args) => {
    let invite = await client.generateInvite(['ADMINISTRATOR', 'MANAGE_MESSAGES']);
    return message.reply(invite);
}

module.exports.help = {
    name: "invite",
    description: `Sends an invite, to add the bot to your server.`,
    usage: "invite",
    type: "help"
}

module.exports.conf = {
}