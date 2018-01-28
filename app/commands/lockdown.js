exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("You don't have the correct permissions to lockdown!");
    if(!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("I don't have the correct permissions to lockdown!");

    let m = await message.channel.send("Locking channel...");
    await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    });
    await m.edit("Channel locked.");
}

exports.help = {
    name: "lockdown",
    description: "Locks the current channel so that nobody can send messages.",
    usage: "lockdown",
    type: "moderation"    
}