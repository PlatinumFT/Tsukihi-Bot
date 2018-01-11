exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.sendMessage("You don't have the correct permissions to lockdown!");

    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    }).then(() => {
        message.channel.send(`Channel unlocked.`);
    }).catch(() => {
        message.channel.send(`Unlocking channel failed!`);
    });
}

exports.help = {
    name: "unlock",
    description: "Unlocks the current channel.",
    usage: "unlock",
    type: "moderation"    
}