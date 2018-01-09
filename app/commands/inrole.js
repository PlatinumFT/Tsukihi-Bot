const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    let text = args.slice(0).join(' ');    

    let role = message.guild.roles.find(val => val.name.toLowerCase() === text.toLowerCase());
    if(!role) message.channel.send('I cannot find this role!');   
    let str = '';
    let count=0;

    if (role.members.length > 20) {
        pastebin.createPaste()
    }


    role.members.forEach(function(e) {
        str+=`${e.user.username}#${e.user.discriminator}\n`;
        count+=1;
    });

    if (str.length > 2048) {
        message.channel.send(`Exceeds 2048 characters! There are ${count} users in role ${role.name}.`);
    } else {
        let embed = new Discord.RichEmbed()
        .setAuthor(`List of users in role '${role.name}' - ${count}`)
        .setColor(role.color)
        .setDescription(str)
        .setTimestamp();

        return message.channel.send(embed)
    }
}

exports.help = {
    name: "inrole",
    description: "Checks the users in a role.",
    usage: "inrole",
    type: "help"    
}