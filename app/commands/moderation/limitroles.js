exports.run = async (client, message, args) => {
    const query = client.db;
    var res = await query(`SELECT * FROM guilds where guild_id='${message.guild.id}'`);
    if(!args[0]) return message.channel.send('Please choose the amount of roles you want to limit!');

    if(res[0]) query( `UPDATE guilds SET role_limit = '${args[1]}' WHERE guild_id = '${message.guild.id}'`);
    else query(`INSERT INTO guilds(guild_id, role_limit) values ('${message.guild.id}', '${args[0]}')`);
    return message.channel.send(`Role limit updated to ${args[0]}`);
}


exports.help = {
    name: "limitroles",
    description: "Limits the amount of limited roles a member can get.",
    usage: "limitroles 2",
    type: "help"
}

exports.conf = {
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}