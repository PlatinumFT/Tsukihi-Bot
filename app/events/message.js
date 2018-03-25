const Discord = require("discord.js");

module.exports = async message => {

    if(message.author.bot) return;
    var client = message.client;
    var settings = client.settings;
    var prefix = settings.prefix;
    var prefix2 = null;
    var query = client.db;
    var blacklist = client.blacklist;

    if(blacklist.indexOf(message.author.id) > -1) return;

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let command = messageArray[0];
    let isOwner = false;
    if(settings.owner_id == message.author.id) isOwner = true;
    
    if(message.channel.type == 'dm') return dmOwner(message);
    
    if(!command.startsWith(prefix)) {
        var res = await query(`SELECT * FROM guilds where guild_id='${message.guild.id}'`);
        if(res[0]) prefix = res[0].prefix;
    }
    
    require('../util/filter.js')(message, message.content);
    require('../util/xpHandler.js')(message);

    if(!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if(!cmd) return;

    if ((cmd.help.type == "owner" && !isOwner)) return console.log(':)');
    let bool = await require('../util/permsChecker.js')(cmd, message);
    if(bool) cmd.run(client, message, args);
};

function dmOwner(message) { 
    const client = message.client;
    
    let c = client.users.get(client.settings.owner_id);

    let embed = new Discord.RichEmbed()
        .setAuthor(`Message recieved from ${message.author.username}`, message.author.displayAvatarURL)
        .setColor('#FFFFFF')
        .setDescription(`Content: ${message.content}`)
        .setTimestamp()
        .setFooter(`${message.author.id}`);

    return c.send(embed);
}