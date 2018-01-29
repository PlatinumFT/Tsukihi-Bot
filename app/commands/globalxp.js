const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let text = args.slice(0).join(' ');
    const query = bot.db;
    let xp;
        if(!text) target = message.author;
    
        if(text) {
            let isXp;
            let isName;
            isId = bot.users.get(text);
            isName = bot.users.find(val => val.username.toLowerCase() === text.toLowerCase());
            if (isId) {
                target = isId;
            } else if (isName) {
                target = isName;
            } else if (message.mentions.users) {
                target = message.mentions.users.first();
            } else message.channel.send("not found!");
        }
            
        if(!target) return message.channel.send("not found");

        let res = await query(`SELECT * FROM globalxp WHERE (user_id = '${target.id}')`);
        if (!res[0]) {
            xp = 0;
        } else {
            xp = res[0].xp;
        }

        let embed = new Discord.RichEmbed()
        .setAuthor(`Current xp for ${target.username}`, target.displayAvatarURL)
        .setDescription(`${target.username} currently has ${xp} XP.`);

        message.channel.send(embed);
}

module.exports.help = {
    name: "globalxp",
    description: "Shows your global xp.",
    usage: "xp",
    type: "utility"    
}