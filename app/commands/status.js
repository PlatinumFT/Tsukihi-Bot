const Discord = module.require("discord.js");
var os = require('os');

module.exports.run = async (client, message, args) => {
    let duration = client.uptime;

    let milliseconds = parseInt((duration%1000)/100)
    let seconds = parseInt((duration/1000)%60)
    let minutes = parseInt((duration/(1000*60))%60)
    let hours = parseInt((duration/(1000*60*60))%24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

    let target = client.user;

    let roles = "";
    let count = 0;        
    let guildMem = message.guild.members.get(target.id);

    guildMem.roles.forEach(x => {
        if (x.name == "@everyone") return;
        roles+=x.name + " ";
        count+=1;
    })

    owners = '166995790416314370';

    let embed = new Discord.RichEmbed()
        .setAuthor(`${target.username} by Platinum#2109`, target.displayAvatarURL)
        .setColor(guildMem.displayColor)
        .setThumbnail(target.displayAvatarURL)
        .setDescription(`Serving ${client.users.size} users in ${client.guilds.size} guilds.`)
        .addField('Ram usage', `${os.freemem()/1048576}MB`, true)
        .addField('Uptime', `${hours}:${minutes}:${seconds}.${milliseconds}`, true)
        .addField('Bot owners', owners)
        .addField(`Roles [${count}]`, roles)
        .setTimestamp();

    return message.channel.send(embed);
}

module.exports.help = {
    name: "status",
    description: "Checks bot info",
    usage: "utility"
}
