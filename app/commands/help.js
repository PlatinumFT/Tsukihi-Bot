const Discord = module.require("discord.js");

exports.run = async (bot, message, args) => {

    function embedHelp(m, text, thumb) {
        let embed = new Discord.RichEmbed()
    .setColor("#9B59B6")
    .addField(m, text)
    .setFooter(thumb);
    return embed;
    }


    let helpme = args[0];

    if (!helpme) {

        let listMod="";
        let listFun="";
        let listHelp="";
        let listUtility="";
        let listRoles="";
        let listOwner="";

        bot.commands.forEach(k =>
        {
            if(k.help.type == "help") listHelp+=k.help.name + " "
            if(k.help.type == "moderation") listMod+=k.help.name + " "
            if(k.help.type == "roles") listRoles+=k.help.name + " "
            if(k.help.type == "owner") listOwner+=k.help.name + " "
        });
        let guildMem = message.guild.members.get(client.user.id);

        let embed = new Discord.RichEmbed()
        .setAuthor(`List of commands for ${bot.user.username}`, bot.user.avatarURL)
        .setColor(guildMem.displayColor)
        .addField(`Moderation`, listMod)
        .addField(`Fun`, listFun)
        .addField(`Roles`, listRoles)
        .addField(`Help`, listHelp)        
        .addField(`Owner`, listOwner)        
        .setFooter(`Use help [command] for more info.`);


        message.channel.send(embed);
    };

    if (helpme) {

	let cmd = bot.commands.get(args[0]);

        let embed = new Discord.RichEmbed()
        .setColor("#9B59B6")
        .addField(`${cmd.help.name}`, `${cmd.help.description}`)
        .setFooter(`Usage: ${cmd.help.usage}`);

        message.channel.send(embed);
    };
};

exports.help = {
    name: "help",
    type: "help"
}
