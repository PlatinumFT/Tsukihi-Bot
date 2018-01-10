const Discord = module.require("discord.js");

exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating avatar...")
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

    await message.channel.send(target.avatarURL);
    
    msg.delete();
}

exports.help = {
    name: "avatar",
    description: "Checks avatar",
    usage: "avatar @Platinum"
}

exports.conf = {
    aliases: [ 'av' ]
}