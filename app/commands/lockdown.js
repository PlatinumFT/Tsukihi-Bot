exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.sendMessage("You don't have the correct permissions to lockdown!");

    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }).then(() => {
        message.channel.send(`Channel locked.`);
    }).catch(() => {
        message.channel.send(`Locking channel failed!`);
    });
}

exports.help = {
    name: "lockdown",
    description: "Locks the current channel so that nobody can send messages.",
    usage: "lockdown",
    type: "moderation"    
}
exports.conf = {
    aliases: ['ld']
}