const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    const query = bot.db;
    
    let res = await query.qall(`SELECT * FROM roles WHERE guild_id = '${message.guild.id}'`);
    let assignNames = "";

        var numbRoles = res.length;
        if (res.length == 0) assignNames = "There are no self assignable roles."
        for (i = 0; i < numbRoles; i++) {
            let myRole = message.guild.roles.find("id", res[i].role_id);
            if(i == numbRoles-1) {
                assignNames+=myRole.name + "."
        } else {
            assignNames+=myRole.name + ", ";
        }
        }

        let guildMem = message.guild.members.get(client.user.id);

        let embed = new Discord.RichEmbed()
        .setAuthor(`List of roles for ${message.guild.name}`, message.guild.iconURL)
        .setColor(guildMem.displayColor)
        .addField(`Roles`, `${assignNames}`)

        message.channel.send(embed);    
}

module.exports.help = {
    name: "listroles",
    description: "Lists self assignable roles.",
    usage: `listroles`,
    type: "roles"    
}