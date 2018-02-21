const Discord = module.require("discord.js");

exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("You don't have permissions to ban!");

    let toBan = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!toBan) return message.channel.send("You did not specify a user!")
    if(!toBan.id == message.author.id) return message.channel.send("You cannot ban yourself!");
        try {
            ban = await message.guild.member(toBan).ban();

            let embed = new Discord.RichEmbed()
            .setAuthor(`Banned`)
            .setDescription(`Banned user ${toBan}.`)
            .addField('ID', `${toBan.id}`)            
            .setColor("#FF0000")

            return message.channel.send(embed);
        } catch(e) {
            return message.channel.send('I cannot ban this user!');
        }
    }
    
exports.help = {
        name: "ban",
        description: "Bans the specified user. Option to add a reason.",
        usage: `ban @Platinum#2109 banned for advertising`,
        type: "moderation"
}

exports.conf = {
    aliases: [ 'b' ]
}