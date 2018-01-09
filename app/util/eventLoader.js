const reqEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

module.exports = client => {
    var query = client.db;

    client.on('ready', () => reqEvent('ready')(client));
    // client.on('reconnecting', () => reqEvent('ready')(client));
    client.on('disconnected', () => reqEvent('ready')(client));
    // client.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(member,client));
    client.on('message', (message) => reqEvent('message')(message));
    // client.on('guildCreate', (guild) => reqEvent('guildCreate')(guild,client));
    // client.on('guildDelete', (guild) => reqEvent('guildDelete')(guild,client));
}