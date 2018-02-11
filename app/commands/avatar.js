const Discord = module.require("discord.js");

exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating avatar...")
    let target;
    
    let text = args.slice(0).join(' ');
    
    if(!text) target = message.author;
    
    if(text) target = bot.users.get(text) 
                      || bot.users.find(u => u.username.toLowerCase() === text.toLowerCase()) 
                      || message.mentions.users.first();
        
    if(!target) return message.channel.send("not found");

    await message.channel.send({
        file: target.avatarURL.replace('?size=2048', '')
    });
    
    await msg.delete();
}

exports.help = {
    name: "avatar",
    description: "Checks avatar",
    usage: "avatar @Platinum"
}

exports.conf = {
    aliases: [ 'av' ]
}