const Discord = module.require("discord.js");

exports.run = async (bot, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("You don't have permissions to kick!");
        
        let toKick = message.mentions.users.first() || message.guild.members.get(args[0]);
        if(!toKick) return message.channel.send("You did not specify a user!")
        if(!toKick.id == message.author.id) return message.channel.send("You cannot kick yourself!");
        try {
            kick = await message.guild.member(toKick).kick();

            let embed = new Discord.RichEmbed()
            .setAuthor(`Kicked`)
            .setDescription(`Kicked user ${toKick}.`)
            .addField('ID', `${toKick.id}`)
            .setColor("#FFFF00");

            return message.channel.send(embed);
        } catch(e) {
            message.channel.send('I cannot kick this user!');
        }
    }

exports.help = {
    name: "kick",
    description: "Kicks the specified user. Option to add a reason.",
    usage: `kick @Platinum#2109 kicked for NSFW outside of designated channel`,
    type: "moderation"    
}

exports.conf = {
    aliases: [ 'k' ]
}