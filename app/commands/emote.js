const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Please specify an emote!")
    var arg = args[0].split(":");
    emojiId = arg[2].substr(0, arg[2].indexOf('>'));


    message.channel.send(`**Emote:** :${arg[1]}:`, {
        file: `https://cdn.discordapp.com/emojis/${emojiId}.png`
    });
}

exports.help = {
    name: "emote",
    description: "",
    usage: "emote",
    type: "utility"
}

exports.conf = {
    aliases: [ 'se', 'emoji' ]
}