const Discord = module.require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
    if (!args[1]) {
        if(!args[0]) guildID = message.guild.id;
        else guildID = args[0];
        let target = client.guilds.get(guildID);
        let owner = target.members.get(target.ownerID);
        let emojis = 0;
        target.emojis.forEach(e => {
            emojis+=1;
        })
        let embed = new Discord.RichEmbed()
        .setAuthor(`Guild info for ${target.name}`, target.iconURL)
        .setDescription(`ID: ${target.id}`)
        .setColor('#FFFFFF')
        .setThumbnail(target.iconURL)
        .addField("Owner", `${owner.user.username}#${owner.user.discriminator}`, true)
        .addField("Reigon", `${target.region}`, true)
        .addField("Emotes count", emojis,true)          
        .addField("Members", `${target.memberCount}`,true)
        .addField("Created", moment(target.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a'), true)          
        .setTimestamp();

        message.channel.send(embed);
    } else if(args[1] = "users") {
        let target = client.guilds.get(args[0]);
        let users = "";
        target.members.forEach(e => {
            users+=`\`${e.user.username}#${e.user.discriminator}\`, `;
        });
        return message.channel.send(`**List of users in ${target.name}**\n${users}`);
    }
}

exports.help = {
    name: "guildinfo",
    description: "Checks a guild.",
    usage: "guildinfo id",
    type: "owner"    
}