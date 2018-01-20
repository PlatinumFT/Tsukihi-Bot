const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let target;
    let text = args.slice(0).join(' ');

    if(!text) target = message.author;

    if(text) {
        let isXp;
        let isName;
        isXp = bot.users.get(text);
        isName = bot.users.find(val => val.username.toLowerCase() === text.toLowerCase());
        if (isXp) {
            target = isXp;
        } else if (isName) {
            target = isName;
        } else if (message.mentions.users) {
            target = message.mentions.users.first();
        } else message.channel.send("not found!");
    }
        if(!target) return message.channel.send("not found");

        let roles = "";
        let count = 0;        
        let guildMem = message.guild.members.get(target.id);

        guildMem.roles.forEach(x => {
            if (x.name == "@everyone") return;
            roles+=x.name + " ";
            count+=1;
        })
        if(!guildMem.nickname) nickname = "None"
        else nickname = guildMem.nickname;
        
        let embed = new Discord.RichEmbed()
            .setAuthor(`User info for ${target.username}`, target.displayAvatarURL)
            .setDescription(`Playing **${guildMem.presence.game.name}**`)
            .setColor(guildMem.displayColor)
            .setThumbnail(target.displayAvatarURL)
            .addField("Full Username", `${target.username}#${target.discriminator}`, true)
            .addField("ID", `${target.id}`, true)
            .addField("Nickname", `${nickname}`, true)
            .addField("Status", `${guildMem.presence.status}`, true)            
            .addField("Created At", moment(target.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
            .addField("Join Date", moment(target.joinedAt).format('MMMM Do YYYY, h:mm:ss a'))            
            .addField(`Roles [${count}]`, roles)
            .setTimestamp();

        message.channel.send(embed);

        return;

}

module.exports.help = {
    name: "userinfo",
    description: "Shows the userinfo for a user.",
    usage: "userinfo @Platinum",
    type: "fun"    
}