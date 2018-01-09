exports.run = async (client, message, args) => {
    let str = ""
    client.guilds.forEach(e => {
        str+=`${e.name} - ${e.id}\n`;
    });
    return message.channel.send(`**Guilds that I am currently in:**\n${str}`)
}

exports.help = {
    name: "checkguilds",
    description: "Checks the guilds that I am in.",
    usage: "checkguilds",
    type: "owner"    
}