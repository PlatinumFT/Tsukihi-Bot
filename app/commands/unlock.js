exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("You don't have the correct permissions to lockdown!");
    if(!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("I don't have the correct permissions to lockdown!");

    let m = await message.channel.send("Unlocking channel...");
    await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    });
    await m.edit("Channel unlocked.");
}

exports.help = {
    name: "unlock",
    description: "Unlocks the current channel.",
    usage: "unlock",
    type: "moderation"    
}