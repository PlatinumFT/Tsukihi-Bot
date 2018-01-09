
module.exports = async message => {

    if(message.author.bot) return;
    var client = message.client;
    var settings = client.settings;
    var prefix = settings.prefix;
    var prefix2 = null;
    var query = client.db;

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let command = messageArray[0];

    var res = await query(`SELECT * FROM guilds where guild_id='${message.guild.id}'`);
    if(res[0]) prefix2 = res[0].prefix;

    if(message.channel.type == 'dm') return;
    if(command.startsWith(prefix) || command.startsWith(prefix2));
    else return;

    let cmd = client.commands.get(command.slice(prefix.length)) || 
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if(!cmd) return;

    if ((cmd.help.type == "owner" && !isOwner)) return;

    cmd.run(client, message, args);
};