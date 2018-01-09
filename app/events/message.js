
module.exports = async message => {

    if(message.author.bot) return;
    const client = message.client;
    let cooldown = client.cooldown;
    let settings = client.settings;
    var prefix = settings.prefix;
    var prefix2 = null;

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let command = messageArray[0];

    if(message.channel.type == 'dm') return;
    if(command.startsWith(prefix) || command.startsWith(prefix2));
    else return;

    let cmd = client.commands.get(command.slice(prefix.length)) || 
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if(!cmd) return;

    if ((cmd.help.type == "owner" && !isOwner)) return;

    cmd.run(client, message, args);
};