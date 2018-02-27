const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("You don't have the correct permissions to view warnings!");
    
    let query = client.db;
    let embed = new Discord.RichEmbed()
                .setAuthor(`Warnings for ${message.guild.name}`, message.guild.iconURL)
                .setColor(await client.findColour(message, client.user))
    let res;
    
    if(!args[0]) {
        res = await query(`select * from warnings where guild_id = '${message.guild.id}' order BY ID DESC`);
        if(res.length == 0) {
            embed.setDescription(`There are no warnings for ${message.guild.name}.`);
        } else {
            let str = "";
            if (res.length > 10) numb=10;
            else numb = res.length
            for(i=0;i<numb;i++) {
                let target = await client.findUser(message, res[i].user_id);
                str += `**Case: ${res[i].id}** - User **__${target.username}#${target.discriminator}__** warned at ${moment(res[i].time).format('MMMM Do YYYY, h:mm:ss a')}\n**Reason:** ${res[i].reason}\n\n`;
            }
    
            embed.setDescription(str);
        }
       
    } else {
        let text = args.slice(0).join(' ');
        let target = await client.findUser(message, text);
        if(target || target.user.username) {
            res = await query(`select * from warnings where guild_id = '${message.guild.id}' and user_id = '${target.id}' order BY ID DESC LIMIT 5`);
            if(res.length == 0) {
                embed.setDescription(`There are no warnings for ${target.username}.`);
            } else {
                let str = "";
                if (res.length > 10) numb=10;
                else numb = res.length
                for(i=0;i<numb;i++) {
                    str += `**Case: ${res[i].id}** - User **__${target.username}#${target.discriminator}__** warned at ${moment(res[i].time).format('MMMM Do YYYY, h:mm:ss a')}\n**Reason:** ${res[i].reason}\n\n`;
                }
        
                embed.setDescription(str);
            }
        }
    }

    message.channel.send(embed);
}

module.exports.help = {
    name: "warnings",
    description: "",
    usage: "",
    type: ""
}