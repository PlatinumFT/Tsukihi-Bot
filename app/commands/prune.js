exports.run = async (client, message, args) => {
    if (args[0]) {
        if(!parseInt(args[0])) return message.channel.send(`Please use a valid number!`);

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        console.log(fetched);
    } else {

    }
}

exports.help = {
    name: "prune",
    description: "Prunes messages. No message will by default prune the bot.",
    usage: "prune",
    type: "moderation"    
}