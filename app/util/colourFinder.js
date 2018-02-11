const reqEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

module.exports = async (message, user) => {
    let embedColor = "#f3c2ab";
    let guildMember = message.guild.members.get(user.id);

    if(!guildMember) return embedColor;
    if(guildMember.displayColor == "0") return embedColor;
    else return guildMember.displayColor;
}